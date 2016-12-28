<?php

$test = array(
  'status' => 'sucess',
  'message' => 'Gratz! your legacy form works.'
);

return '<script> window.parent.postMessage(\'' . json_encode($test) . '\', "*"); </script>';
