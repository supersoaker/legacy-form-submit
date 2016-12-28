# legacy-form-submit
A JS script which posts your formular into a iframe and handles all associated post messages.
Just include the main.js or main.min.js and activate it for example with:
```js
submitFormIntoFrame('#form', 'https://example.com?postMessage', function(data) {
  if(data.status && status == 'success') {
      console.log(data);
  } else {
      console.log('error..', data);
  }
});
```
Here is an example for the /form.php
```php
$test = array(
  'status' => 'sucess',
  'message' => 'Gratz! your legacy form works.'
);
return '<script> window.parent.postMessage(\'' . json_encode($test) . '\', "*"); </script>';
```
