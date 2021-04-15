// Synchronize inputs in the browser preview (not Roll20!)
$('input[type=text]').on('change', function() {
  $(`input[name=${$(this).attr('name')}]`).val($(this).val());
});

$('input[type=text]').on('change', function() {
  $(`span[name=${$(this).attr('name')}]`).html($(this).val());
});

$('textarea').on('change', function() {
  $(`span[name=${$(this).attr('name')}]`).html($(this).val());
});

$('input[type=checkbox]').on('change', function() {
  $(`input[name=${$(this).attr('name')}]`).prop('checked', $(this).prop('checked'));
});
