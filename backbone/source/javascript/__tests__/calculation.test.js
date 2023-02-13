const { k } = require('..');
describe('Calculation.js',()=>{
  describe('calcAttribute({trigger,attributes})',()=>{
    Object.entries({
      vigilance:[{logic:2,willpower:2},{logic:0,willpower:-1},{logic:-1,willpower:-1}],
      build:[{size:2,stamina:2},{size:2,stamina:-1},{size:-1,stamina:-1}],
      intuition:[{charisma:2,wisdom:2},{charisma:2,wisdom:-1},{charisma:-1,wisdom:-1}],
      reflex:[{athletics:2,aptitude:2},{athletics:2,aptitude:-1},{athletics:-1,aptitude:-1}]
    }).forEach(([attr,propArray])=>{
      propArray.forEach(obj => {
        const entries = Object.entries(obj);
        const [prop1,value1,prop2,value2] = entries.flat();
        const expectedVal = 10 + value1 + value2;
        const itMsg = `Given ${value1} ${prop1} and ${value2} ${prop2}, should return ${expectedVal} for ${attr}`
        it(itMsg,()=>{
          k.getAllAttrs({
            callback:(attributes,sections,casc)=>{
              attributes[prop1] = value1;
              attributes[prop2] = value2;
              const retVal = k.callFunc('calcAttribute',{trigger:{name:`${attr}_goal`},attributes});
              expect(retVal).toBe(expectedVal);
            }
          });
        });
      });
    });
  });
  describe('calcAttributeMod({trigger,attributes})',()=>{
    Object.entries({
      vigilance:[9,11,14],
      build:[9,11,14],
      intuition:[9,11,14],
      reflex:[9,11,14],
    }).forEach(([attr,numArr]) => {
      numArr.forEach((num)=>{
        const expectedVal = num - 11;
        const itMsg = `Given ${num} ${attr}, should return ${expectedVal} for ${attr}_mod`;
        it(itMsg,()=>{
          k.getAllAttrs({
            callback:(attributes,sections,casc)=>{
              attributes[`${attr}_goal`] = num;
              expect(k.callFunc('calcAttributeMod',{trigger:{name:attr},attributes})).toBe(expectedVal);
            }
          });
        });
      });
    });
  });
  describe('calcMovement({attributes})',()=>{
    [-1,0,2].forEach(num => {
      const expectedVal = 20 + num * 5;
      const itMsg = `Given ${num} athletics, should return ${expectedVal}`;
      it(itMsg,()=>{
        k.getAllAttrs({
          callback:(attributes,sections,casc) => {
            attributes.athletics = num;
            expect(k.callFunc('calcMovement',{attributes})).toBe(expectedVal);
          }
        })
      })
    });
  });
  describe('calcSprint({attributes})',()=>{
    [-1,0,2].forEach(num => {
      const expectedVal = 10 + num * 5;
      const itMsg = `Given ${num} athletics, should return ${expectedVal}`;
      it(itMsg,()=>{
        k.getAllAttrs({
          callback:(attributes,sections,casc) => {
            attributes.athletics = num;
            expect(k.callFunc('calcSprint',{attributes})).toBe(expectedVal);
          }
        });
      });
    });
  });
  describe('calcItemSlotsMax({attributes})',()=>{
    it('Max item slots should equal the largest of SIZ + 3 or SIZ + ATH + 1',()=>{
      k.getAllAttrs({
        callback:(attributes,sections,casc)=>{
          // siz + athletics + 1 < siz + 3
          attributes.attributes.size = 4;
          attributes.attributes.athletics = 1;
          const sizExpected = 7;

          const sizReceived = k.callFunc('calcItemSlotsMax',{attributes});

          expect(sizReceived).toBe(sizExpected);
          // siz + athletics + 1 === siz +3
          attributes.attributes.size = 4;
          attributes.attributes.athletics = 2;
          const equalExpected = 7;
          
          const equalReceived = k.callFunc('calcItemSlotsMax',{attributes});

          expect(equalReceived).toBe(equalExpected);

          // siz + athletics + 1 > siz +3
          attributes.attributes.size = 4;
          attributes.attributes.athletics = 4;
          const athExpected = 9;
          
          const athReceived = k.callFunc('calcItemSlotsMax',{attributes});

          expect(athReceived).toBe(athExpected);
        }
      });
    });
  });
  describe('calcUsedSlots({attributes,sections})',()=>{
    it('used Item slots should equal the number of equipped items',()=>{
      k.getAllAttrs({
        callback:(attributes,sections,casc)=>{
          // no equipped items
          const emptyUsed = k.callFunc('calcUsedSlots',{attributes,sections});

          expect(emptyUsed).toBe(0);

          // 3 equipped gear pieces; 1 that doesn't use a slot, no weapons
          const equippedRows = [1,2,3].map(n=>k.generateRowID('repeating_equipped',sections));
          equippedRows.forEach((row,n)=>
            attributes.attributes[`${row}_uses_slot`] =
              n === 1 ?
                0 :
                1
          );
          
          const equipUsed = k.callFunc('calcUsedSlots',{attributes,sections});

          expect(equipUsed).toBe(2);

          // 3 equipped gear pieces; 1 that doesn't use a slot, and 2 weapons; 1 that doesn't use a slot
          const weaponRows = [1,2].map(n=>k.generateRowID('repeating_weapon',sections));
          weaponRows.forEach((row,n)=>
            attributes.attributes[`${row}_uses_slot`] =
              n === 1 ?
                0 :
                1
            );

          const weaponUsed = k.callFunc('calcUsedSlots',{attributes,sections});

          expect(weaponUsed).toBe(3);

        }
      })
    })
  });
});