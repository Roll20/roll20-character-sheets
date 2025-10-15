'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from './TheAaronSheet.js';

var rollOperator;

function parseExpression (s, until) {
  var untilCb = (typeof until === "function" ? until : function (tok) {
    return (tok == until);
  }),
  // constants
  ARG_COUNTS = {
    'abs': 1,
    'ceil': 1,
    'floor': 1,
    'round': 1,
    'max': [1],
    'min': [1]
  },
  BINARY_PRECEDENCE = {
    '?': 1,
    ':': 2,
    '||': 3,
    '&&': 4,
    '|': 5,
    '^': 6,
    '&': 7,
    '=': 8,
    '==': 8,
    '!=': 8,
    '>=': 9,
    '>': 9,
    '<': 9,
    '<=': 9,
    '<<': 10,
    '>>': 10,
    '+': 11,
    '-': 11,
    '*': 12,
    '/': 12,
    '%': 12,
    '**': 14,
    't': 98,
    'd': 99
  },
  UNARY_PRECEDENCE = {
    '!': 13,
    '~': 13,
    '-': 13
  },
  CLOSERS = {
    '(': ")",
    '{': "}"
  },
  // local variables
  operators = [{
    'precedence': 0
  }],
  operands = [],
  tableExp,
  m,
  err,
  operand;
  // helper functions
  function getToken(s) {
    var m;
    if (!s) {
      return s;
    }

    function retVal(tokType, matchObj) {
      return {
        'type': tokType,
        'text': matchObj[0],
        'match': matchObj
      };
    }
    m = s.match(/^\s+/);
    if (m) {
      return retVal("whitespace", m);
    }
    m = s.match(/^(abs|ceil|floor|round|max|min)[(]/);
    if (m) {
      return retVal("function", m);
    }
    m = s.match(/^[({]/);
    if (m) {
      return retVal("opengroup", m);
    }
    m = s.match(/^[)}]/);
    if (m) {
      return retVal("closegroup", m);
    }
    m = s.match(/^((\d+(\.\d+)?)|(\.\d+))/);
    if (m) {
      return retVal("number", m);
    }
    m = s.match(/^['"]/);
    if (m) {
      return retVal("quote", m);
    }
    m = s.match(/^((\|\|)|(&&)|(==)|(!=)|(>=)|(<=)|(<<)|(>>)|(\*\*)|[?:|\^&=><%!~])/);
    if (m) {
      return retVal("extoperator", m);
    }
    m = s.match(/^[\-+*\/td]/);
    if (m) {
      return retVal("baseoperator", m);
    }
    m = s.match(/^\[([^\]]+)\]/);
    if (m) {
      return retVal("label", m);
    }
    m = s.match(/^\$\{([^'"\($\}][^}]*)\}/);
    if (m) {
      return retVal("variable", m);
    }
    m = s.match(/^\$\{/);
    if (m) {
      return retVal("openvariable", m);
    }
    return {
      'type': "raw",
      'text': s.charAt(0)
    };
  }

  function popToken(state) {
    state.tok = getToken(state.s);
    if (state.tok) {
      state.s = state.s.substring(state.tok.text.length);
    }
    return state;
  }

  function popString(state, delim) {
    var i = -1,
    j = i,
    retval;
    // find first index of delim not preceded by an odd number of backslashes
    while (((i - j) & 1) === 0) {
      i = state.s.indexOf(delim, i + 1);
      if (i < 0) {
        return;
      }
      j = i - 1;
      while ((j >= 0) && (state.s.charAt(j) === '\\')) {
        j--;
      }
    }
    // unescape string to be returned
    function replaceEscapes(s) {
      return s.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\/g, "");
    }
    retval = state.s.substring(0, i).split("\\\\").map(replaceEscapes).join("\\");
    // point state delim, then pop off the delimiter token
    state.s = state.s.substring(i);
    popToken(state);
    return retval;
  }

  function popOperator() {
    var op = operators.pop(),
    right = operands.pop(),
    left,
    cond,
    datatype;
    if (op.unary) {
      operands.push({
        'type': (op.type === "baseoperator" ? "unop" : "unopex"),
        'datatype': right.datatype,
        'operator': op.text,
        'operand': right
      });
      return;
    }
    left = operands.pop();
    if (op.text !== ":") {
      if (op.text === "d" || op.text === "t") {
        datatype = "number";
      } else if (left.datatype === right.datatype) {
        datatype = left.datatype;
      } else if ((left.datatype === "string") || (right.datatype === "string")) {
        datatype = "string";
      }
      operands.push({
        'type': (op.type === "baseoperator" ? "binop" : "binopex"),
        'datatype': datatype,
        'operator': op.text,
        'left': left,
        'right': right,
        'mods': op.mods,
        'label': op.label
      });
      return;
    }
    op = operators.pop();
    if (op.text !== "?") {
      return "Error: Expected ? but got " + op.text;
    }
    cond = operands.pop();
    operands.push({
      'type': "cond",
      'cond': cond,
      'left': left,
      'right': right,
      'datatype': (left.datatype === right.datatype ? left.datatype : undefined)
    });
  }

  function pushOperator(op) {
    var err;
    op.precedence = (op.unary ? UNARY_PRECEDENCE[op.text] : BINARY_PRECEDENCE[op.text]) || 0;
    while (operators[operators.length - 1].precedence >= op.precedence) {
      err = popOperator();
      if (err) {
        return err;
      }
    }
    operators.push(op);
  }

  function argListUntil(tok) {
    return (tok === ',') || (tok === ')');
  }

  function parseHelper() {
    var err,
    func,
    argCounts,
    minArgs,
    maxArgs,
    str,
    args,
    argTree,
    opener,
    closer,
    operand,
    varExp;
    popToken(s);
    if (!s.tok) {
      return "Error: Unrecognized token: " + s.s.split(" ", 1)[0];
    }
    while (s.tok.type === "whitespace") {
      popToken(s);
      if (!s.tok) {
        return "Error: Unrecognized token: " + s.s.split(" ", 1)[0];
      }
    }
    switch (s.tok.type) {
      case "function":
        func = s.tok.match[1];
        argCounts = ARG_COUNTS[func];
        if (argCounts === undefined) {
          return "Error: Unrecognized function: " + func;
        }
        if (Array.isArray(argCounts)) {
          minArgs = argCounts[0];
          maxArgs = argCounts[1];
        } else {
          minArgs = argCounts;
          maxArgs = argCounts;
        }
        args = [];
        while ((s.tok) && (s.tok.text !== ')')) {
          argTree = parseExpression(s, argListUntil);
          if (typeof (argTree) === "string") {
            return argTree;
          } // error
          args.push(argTree);
          if (!s.tok) {
            return "Error: Unterminated function: " + func;
          }
          if (!argListUntil(s.tok.text)) {
            return "Error: Expected ',' or ')' to continue/close '" + func + "(', but got '" + s.tok.text + "'";
          }
        }
        if (minArgs < 0) {
          minArgs = args.length;
        }
        if (isNaN(maxArgs) || maxArgs < 0) {
          maxArgs = args.length;
        }
        if (args.length < minArgs) {
          return "Error: Function '" + func + "' requires at least " + minArgs + " argument(s)";
        }
        if (args.length > maxArgs) {
          return "Error: Function '" + func + "' requires at most " + maxArgs + " argument(s)";
        }
        operands.push({
          'type': "function",
          'datatype': "number",
          'function': func,
          'args': args
        });
        return;
      case "number":
        operands.push({
          'type': "number",
          'datatype': "number",
          'value': parseFloat(s.tok.text)
        });
        return;
      case "variable":
        operands.push({
          'type': "variable",
          'value': s.tok.match[1]
        });
        return;
      case "quote":
        str = popString(s, s.tok.text);
        if (typeof (str) !== "string") {
          return "Error: Unterminated string";
        }
        operands.push({
          'type': "string",
          'datatype': "string",
          'value': str
        });
        return;
      case "opengroup":
        opener = s.tok.text;
        closer = CLOSERS[opener];
        operand = parseExpression(s, closer);
        if (typeof (operand) === "string") {
          return operand;
        } // error
        operands.push(operand);
        if (s.tok.text !== closer) {
          return "Error: Expected '" + closer + "' to close '" + opener + "', but got '" + s.tok.text + "'";
        }
        return;
      case "openvariable":
        varExp = parseExpression(s, "}");
        if (typeof (varExp) === "string") {
          return varExp;
        } // error
        if (s.tok.text !== "}") {
          return "Error: Expected '}' to close '${', but got '" + s.tok.text + "'";
        }
        operands.push({
          'type': "variable",
          'value': varExp
        });
        return;
      case "extoperator":
      case "baseoperator":
        if (!UNARY_PRECEDENCE[s.tok.text]) {
          return "Error: " + s.tok.text + " is not a unary operator";
        }
        s.tok.unary = true;
        err = pushOperator(s.tok);
        if (err) {
          return err;
        }
        return parseHelper();
    }
    return "Error: Unrecognized token: " + s.tok.text + (s.tok.type === "raw" ? s.s.split(" ", 1)[0] : "");
  }
  // if we were given a string, construct a state object
  if (typeof (s) === "string") {
    s = {
      's': s
    };
  }
  // push operators and operands to their respective stacks, building sub-ASTs in the operand stack as needed
  err = parseHelper();
  if (err) {
    return err;
  }
  for (popToken(s) ;
  (s.tok) && (!untilCb(s.tok.text)) && ((until) || (s.tok.type !== "raw")) ; popToken(s)) {
    switch (s.tok.type) {
      case "extoperator":
      case "baseoperator":
        rollOperator = (s.tok.text === "d" ? s.tok : null);
        err = pushOperator(s.tok);
        if (err) {
          return err;
        }
        if ((rollOperator) && (s.s.charAt(0) === 'F')) {
          operands.push({
            'type': "rollspec",
            'value': "F"
          });
          s.s = s.s.substring(1);
        } else if (s.tok.text === "t") {
          if (s.s.charAt(0) !== '[') {
            return "Error: 't' operator requires '[table]' argument";
          }
          m = s.s.match(/^\[([^'"$(\]][^\]]*)\]/);
          if (m) {
            tableExp = m[1];
            s.s = s.s.substring(m[0].length);
          } else {
            s.s = s.s.substring(1);
            tableExp = parseExpression(s, "]");
            if (typeof (tableExp) === "string") {
              return tableExp;
            } // error
            if (s.tok.text !== "]") {
              return "Error: Expected ']' to close 't[', but got '" + s.tok.text + "'";
            }
          }
          operands.push({
            'type': "tablename",
            'value': tableExp
          });
        } else {
          err = parseHelper();
          if (err) {
            return err;
          }
        }
        if (rollOperator) {
          m = s.s.match(/^[acdfhkloprs0-9<=>!]+/);
          if (m) {
            rollOperator.mods = m[0];
            s.s = s.s.substring(m[0].length);
          }
        }
        break;
      case "label":
        if ((operators.length > 0) && (operators[operators.length - 1].text === "d")) {
          // set label on "d" operator instead of operand (e.g. "1d6[foo]" is "(1d6)[foo]", not "1d(6[foo])")
          operators[operators.length - 1].label = s.tok.match[1];
          break;
        }
        operand = operands.pop();
        if (operand) {
          operand.label = s.tok.match[1];
          operands.push(operand);
        }
        break;
    }
  }
  // no more input; collapse remaining operators and operands into a single AST
  while (operators.length > 1) {
    err = popOperator();
    if (err) {
      return err;
    }
  }
  return operands.pop();
}
export function write (s) {
  TAS.debug("EXEXP:" + s);
}
function sendCommand (chunks, asts, evalResults, labels) {
  //infinite loop
  //TAS.debug("at sendCommand");
  //TAS.debug(chunks, asts, evalResults, labels);
  // constants
  var FUNCTION_FUNCTIONS = {
    'abs': Math.abs,
    'ceil': Math.ceil,
    'floor': Math.floor,
    'round': Math.round,
    'max': Math.max,
    'min': Math.min
  },
  BINARY_FUNCTIONS = {
    '||': function (x, y) {
      return x || y;
    },
    '&&': function (x, y) {
      return x && y;
    },
    '|': function (x, y) {
      return x | y;
    },
    '^': function (x, y) {
      return x ^ y;
    },
    '&': function (x, y) {
      return x & y;
    },
    '=': function (x, y) {
      return x == y;
    },
    '==': function (x, y) {
      return x === y;
    },
    '!=': function (x, y) {
      return x != y;
    },
    '>=': function (x, y) {
      return x >= y;
    },
    '>': function (x, y) {
      return x > y;
    },
    '<': function (x, y) {
      return x < y;
    },
    '<=': function (x, y) {
      return x <= y;
    },
    '<<': function (x, y) {
      return x << y;
    },
    '>>': function (x, y) {
      return x >> y;
    },
    '+': function (x, y) {
      return x + y;
    },
    '-': function (x, y) {
      return x - y;
    },
    '*': function (x, y) {
      return x * y;
    },
    '/': function (x, y) {
      return x / y;
    },
    '%': function (x, y) {
      return x % y;
    },
    '**': Math.pow,
    'd': function (x, y) {
      var retval = 0,
      i = 0;
      for (i = 0; i < x; i++) {
        retval += randomInteger(y);
      }
      return retval;
    }
  },
  UNARY_FUNCTIONS = {
    '!': function (x) {
      return !x;
    },
    '~': function (x) {
      return ~x;
    },
    '-': function (x) {
      return -x;
    }
  },
  // local variables
  references = {},
  unevalRefs = [],
  evalReqs = [],
  i = 0,
  t,
  err,
  doSubstitution = false,
  label,
  newUneval = [],
  r,
  retval;
  // helper functions
  function lazyEval(t, labels, references, unevalRefs, evalReqs, force) {
    //alert(' at lazyEval, t: ' + t + ', t.type:'+t.type);
    var x,
    y,
    args = [],
    i = 0,
    forceSubtrees;
    if (t.label) {
      labels[t.label] = t;
    }
    switch (t.type) {
      case "number":
      case "rollspec":
        t.baseValid = true;
        return t;
      case "string":
        return t;
      case "tablename":
        if (typeof (t.value) !== "string") {
          x = lazyEval(t.value, labels, references, unevalRefs, evalReqs, true);
          if (typeof (x) === "string") {
            return x;
          } // error
          if (x.type === "number") {
            // number node; coerce to string
            x.value = String(x.value);
            x.type = "string";
          }
          if (x.type !== "string") {
            // unable to fully evaluate table name
            if (t.baseValid) {
              t.baseValid = false;
            }
            unevalRefs.push(t.value);
            return t;
          }
          // successfully evaluated table name
          t.value = x.value;
        }
        // if we got here, t.value is the name of a rollable table
        t.baseValid = true;
        return t;
      case "function":
        for (i = 0; i < t.args.length; i++) {
          x = lazyEval(t.args[i], labels, references, unevalRefs, evalReqs, true);
          if (typeof (x) === "string") {
            return x;
          } // error
          if (x.type === "string") {
            x.value = parseFloat(x.value);
            x.type = "number";
          }
          if (x.type !== "number") {
            // unable to fully evaluate argument
            if (t.baseValid) {
              t.baseValid = false;
            }
            return t;
          }
          args.push(x.value);
        }
        // successfully evaluated all arguments
        t.type = "number";
        t.datatype = "number";
        t.value = FUNCTION_FUNCTIONS[t["function"]].apply(args, args);
        for (i = 0; i < t.args.length; i++) {
          if (t.args[i].label) {
            labels[t.args[i].label] = t.args[i];
          }
        }
        delete t["function"];
        delete t.args;
        t.baseValid = true;
        return t;
      case "unop":
      case "unopex":
        force = force || (t.type !== "unop");
        x = lazyEval(t.operand, labels, references, unevalRefs, evalReqs, force);
        if (typeof (x) === "string") {
          return x;
        } // error
        if (force) {
          if (x.type !== "number") {
            // unable to fully evaluate operand
            if (t.baseValid) {
              t.baseValid = false;
            }
            return t;
          }
          // successfully evaluated operand
          t.type = "number";
          t.datatype = "number";
          t.value = UNARY_FUNCTIONS[t.operator](x.value);
          delete t.operator;
          if (t.operand.label) {
            labels[t.operand.label] = x;
          }
          delete t.operand;
          t.baseValid = true;
        } else {
          t.baseValid = x.baseValid;
        }
        return t;
      case "binop":
      case "binopex":
        force = force || (t.type !== "binop") || (t.left.datatype === "string") || (t.right.datatype === "string");
        forceSubtrees = force || (t.operator === "d") || (t.operator === "t");
        //TAS.debug('left is: ' + t.left + ', right is:' + t.right);
        x = lazyEval(t.left, labels, references, unevalRefs, evalReqs, forceSubtrees);
        y = lazyEval(t.right, labels, references, unevalRefs, evalReqs, forceSubtrees);
        //TAS.debug(x);
        //TAS.debug(y);
        force = true;
        /*********************didn't work until i commented out, now seems to have no effect ********************************/
        if (typeof x === "string") {
          //TAS.debug(x);
          return x;
        } // error
        if (typeof y === "string") {
          //TAS.debug(y);
          return y;
        } // error
        /****************************************************/
        if (force) {
          if ((x.type !== "number") && (x.type !== "string")) {
            // unable to fully evaluate left operand
            if (t.baseValid) {
              t.baseValid = false;
            }
            return t;
          }
          if ((y.type !== "number") && (y.type !== "string") && (y.type !== "rollspec") && (y.type !== "tablename")) {
            // unable to fully evaluate right operand
            if (t.baseValid) {
              t.baseValid = false;
            }
            return t;
          }
          if ((y.type === "rollspec") && (t.operator !== "d")) {
            return "Rollspec operand is only compatible with 'd' operator";
          }
          if ((t.operator === "t") && (y.type !== "tablename")) {
            return "'t' operator requires tablename operand";
          }
          // successfully evaluated both operands
          if ((t.operator === "t") || ((t.operator === "d") && (t.mods))) {
            // operator is rollable table or is roll with mods; must submit to base system for evaluation
            evalReqs.push(t);
            return t;
          }
          //TAS.debug('about to call binary');
          t.value = BINARY_FUNCTIONS[t.operator](x.value, y.value);
          delete t.operator;
          if (t.left.label) {
            labels[t.left.label] = x;
          }
          delete t.left;
          if (t.right.label) {
            labels[t.right.label] = y;
          }
          delete t.right;
          t.type = (typeof (t.value) === "string" ? "string" : "number");
          t.datatype = t.type;
          t.baseValid = (t.datatype === "number");
        } else if ((x.datatype === "number") && (y.datatype === "number")) {
          t.datatype = "number";
          t.baseValid = true;
        }
        return t;
      case "cond":
        x = lazyEval(t.cond, labels, references, unevalRefs, evalReqs, true);
        if (typeof (x) === "string") {
          return x;
        } // error
        if ((x.type !== "number") && (x.type !== "string")) {
          // unable to fully evaluate condition
          t.baseValid = false;
          return t;
        }
        // successfully evaluated condition; replace t with t.left or t.right as appropriate
        y = (x.value ? t.left : t.right);
        if (t.cond.label) {
          labels[t.cond.label] = x;
        }
        delete t.cond;
        delete t.left;
        delete t.right;
        _.each(y, function (k) {
          t[k] = y[k];
        });
        return lazyEval(t, labels, references, unevalRefs, evalReqs, force);
      case "variable":
        if (typeof (t.value) !== "string") {
          x = lazyEval(t.value, labels, references, unevalRefs, evalReqs, true);
          if (typeof (x) === "string") {
            return x;
          } // error
          if (x.type === "number") {
            // number node; coerce to string
            x.value = String(x.value);
            x.type = "string";
          }
          if (x.type !== "string") {
            // unable to fully evaluate variable name
            if (t.baseValid) {
              t.baseValid = false;
            }
            unevalRefs.push(t.value);
            return t;
          }
          // successfully evaluated variable name
          t.value = x.value;
        }
        // if we got here, t.value is the name of a variable
        if ((labels[t.value]) && ((labels[t.value].type === "string") || (labels[t.value].type === "number"))) {
          // variable exists and has been fully evaluated
          t.type = labels[t.value].type;
          t.datatype = labels[t.value].datatype;
          t.baseValid = labels[t.value].baseValid;
          t.value = labels[t.value].value;
        } else {
          // variable not yet defined or not yet fully evaluated
          if (!references[t.value]) {
            references[t.value] = [];
          }
          references[t.value].push(t);
          if (t.baseValid) {
            t.baseValid = false;
          }
        }
        return t;
      default:
        return "Unknown node type: " + t.type;
    }
  }

  function hasUnevaluatedLabels(t) {
    var i = 0;
    // base types: fully evaluated
    if ((t.type === "number") || (t.type === "string") || (t.type === "rollspec")) {
      return false;
    }
    // if we got here, node is unevaluated
    if (t.label) {
      return true;
    }
    // node has no label; check children
    switch (t.type) {
      case "function":
        for (i = 0; i < t.args.length; i++) {
          if (hasUnevaluatedLabels(t.args[i])) {
            return true;
          }
        }
        return false;
      case "tablename":
      case "variable":
        if (typeof (t.value) === "string") {
          return false;
        }
        return hasUnevaluatedLabels(t.value);
      case "unop":
      case "unopex":
        return hasUnevaluatedLabels(t.operand);
      case "cond":
        if (hasUnevaluatedLabels(t.cond)) {
          return true;
        }
        //don't fall through
        if (hasUnevaluatedLabels(t.left)) {
          return true;
        }
        return hasUnevaluatedLabels(t.right);
      case "binop":
      case "binopex":
        if (hasUnevaluatedLabels(t.left)) {
          return true;
        }
        return hasUnevaluatedLabels(t.right);
    }
  }

  function flattenAST(t) {
    var retval;
    switch (t.type) {
      case "number":
      case "rollspec":
        retval = t.value || 0;
        break;
      case "tablename":
        retval = "[" + t.value + "]";
        break;
      case "unop":
        retval = "(" + t.operator + flattenAST(t.operand) + ")";
        break;
      case "binop":
        retval = "(" + flattenAST(t.left) + t.operator + flattenAST(t.right) + (t.mods || "") + ")";
        if ((t.label) && (t.operator === "d")) {
          retval += "[" + t.label + "]";
        }
        break;
      default:
        return "Unknown node type: " + t.type;
    }
    return retval;
  }

  function astToCmd(t) {
    if (t.type === "string") {
      return t.value;
    }
    var retval = flattenAST(t);
    return retval;
  }

  function reportError(err) {
    write("Error: " + err);
    return "";
  }
  //BEGIN
  // substitute in results of base evaluation
  for (i = 0; i < evalResults.length; i++) {
    t = evalResults[i][0];
    delete t.operator;
    delete t.left;
    delete t.right;
    t.type = "number";
    t.datatype = "number";
    t.value = evalResults[i][1];
    t.baseValid = true;
  }
  // traverse ASTs, collapsing as much as possible
  for (i = 0; i < asts.length; i++) {
    if (asts[i].baseValid) {
      continue;
    } // can be handled by base expression evaluator
    if ((asts[i].type === "string") || (asts[i].type === "number")) {
      continue;
    } // tree is fully evaluated
    err = lazyEval(asts[i], labels, references, unevalRefs, evalReqs, false);
    if (typeof (err) === "string") {
      return reportError(err);
    }
  }
  // do variable substitution; repeat until we don't make any more progress
  doSubstitution = true;
  while (doSubstitution) {
    doSubstitution = false;
    // substitute in values for variables for which we already have names
    for (label in references) {
      if (references.hasOwnProperty(label)) {
        if (!labels[label]) {
          return reportError("Variable '" + label + "' not defined");
        }
        if ((labels[label].type !== "string") && (labels[label].type !== "number")) {
          // variable exists but not yet evaluated; try to evaluate
          err = lazyEval(labels[label], labels, references, unevalRefs, evalReqs, true);
          if (typeof (err) === "string") {
            return reportError(err);
          }
        } else if ((labels[label].type === "string") || (labels[label].type === "number")) {
          // variable fully evaluated; substitute it in
          for (i = 0; i < references[label].length; i++) {
            references[label][i].type = labels[label].type;
            references[label][i].datatype = labels[label].datatype;
            references[label][i].value = labels[label].value;
            references[label][i].baseValid = labels[label].baseValid;
          }
          delete references[label];
          doSubstitution = true;
        }
      }
    }
    // try to get names for variables and tables with unevaluated names
    while (unevalRefs.length > 0) {
      r = lazyEval(unevalRefs.shift(), labels, references, unevalRefs, evalReqs, true);
      if (typeof (r) === "string") {
        return reportError(err);
      }
      if ((r.type === "string") || (r.type === "number")) {
        doSubstitution = true;
      } else {
        newUneval.push(r);
      }
    }
    unevalRefs = newUneval;
  }
  // flatten fully evaluated ASTs into strings and splice into chunks
  for (i = asts.length - 1; i >= 0; i--) {
    if ((!asts[i].baseValid) && (asts[i].type !== "number") && (asts[i].type !== "string")) {
      continue;
    }
    if ((unevalRefs.length > 0) & (hasUnevaluatedLabels(asts[i]))) {
      continue;
    }
    chunks.splice(i, 2, (chunks[i] || "") + astToCmd(asts.splice(i, 1)[0]) + (chunks[i + 1] || ""));
  }
  if (evalReqs.length > 0) {
    TAS.error("Cannot evaluate");
    return "";
  }
  if (asts.length > 0) {
    // need to finish evaluating some ASTs; recurse directly
    //TAS.debug("sendCommand (recurse), asts.length=" + asts.length + ", asts[0].baseValid=" + asts[0].baseValid + ", asts[0].type=" + asts[0].type);
    if (!(asts.length === 1 && asts[0].type === "binop")) {
      // HACK! minus (probably) in front; no math needed
      return sendCommand(chunks, asts, [], labels);
    }
  }
  // if we got here, we're done evaluating everything; submit results
  retval = chunks.join("");
  return retval;
}
export function handleExpression (msg) {
  //replace spaces. replace "-" in front with "0-", replace "(-" with "(0-"
  //also replace leading + with '', and replace (+  with (0+
  var chunks = [],
  asts = [],
  cmd,
  state,
  ast;
  msg = msg.replace(/\s/g, '').replace(/^-/, '0-').replace(/\(-/g, '(0-').replace(/^\+/, '').replace(/\(\+/g, '(0+');
  cmd = msg;
  state = {
    's': cmd
  };
  //TAS.debug(msg);
  ast = parseExpression(state, null);
  //TAS.debug(ast);
  if (typeof (ast) === "string") {
    write("could not parse" + msg);
    return "";
  }
  asts.push(ast);
  state.s = (state.tok) ? (state.tok.text + state.s) : state.s;
  //  ((state.tok || {'text': ""}).text || "") + state.s;
  chunks.push(state.s);
  return sendCommand(chunks, asts, [], {});
}

//PFConsole.log('   ExExp module loaded            ');
//PFLog.modulecount++;
