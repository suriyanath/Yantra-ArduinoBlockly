/**
* @fileoverview Generating Dwenguino blocks.
* @author tom.neutens@UGent.be     (Tom Neutens)
*/
'use strict';

goog.provide('Blockly.Arduino.dwenguino');

goog.require('Blockly.Arduino');


// This is now integrated in the setup loop structure so children don't have to know about the initialisation step and can just start coding
Blockly.Arduino['initDwenguino'] = function (block) {

  //    Blockly.Arduino.definitions_['define_wire_h'] = '#include <Wire.h>\n';
  //    Blockly.Arduino.definitions_['define_dwenguino_h'] = '#include <Dwenguino.h>\n';
  //    Blockly.Arduino.definitions_['define_lcd_h'] = '#include <LiquidCrystal.h>\n';

  //Blockly.Arduino.setups_['initDwenguino'] = 'initDwenguino();';
  //var code = 'initDwenguino();';
  return code;
};

Blockly.Arduino['setup_loop_structure'] = function (block) {
  //  Blockly.Arduino.definitions_['define_wire_h'] = '#include <Wire.h>\n';
  //    Blockly.Arduino.definitions_['define_dwenguino_h'] = '#include <Dwenguino.h>\n';
  //  Blockly.Arduino.definitions_['define_lcd_h'] = '#include <LiquidCrystal.h>\n';

  var statements_setup = Blockly.Arduino.statementToCode(block, 'SETUP');
  var statements_loop = Blockly.Arduino.statementToCode(block, 'LOOP');
  // Assemble Arduino into code variable.
  //  Blockly.Arduino.setups_['userSetupCode'] = 'initDwenguino();\n' + statements_setup + "\n";

  return statements_loop;


};


Blockly.Arduino['set_leds'] = function (block) {
  var value_state_11 = Blockly.Arduino.valueToCode(block, "state_11", Blockly.Arduino.ORDER_ATOMIC);
  var value_state_12 = Blockly.Arduino.valueToCode(block, "state_12", Blockly.Arduino.ORDER_ATOMIC);
  var value_state_13 = Blockly.Arduino.valueToCode(block, "state_13", Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output_state_11'] = 'pinMode(11, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_state_12'] = 'pinMode(12, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_state_13'] = 'pinMode(13, OUTPUT);';
  var code = 'digitalWrite(11, ' + value_state_11 + ');\n';
  code += 'digitalWrite(12, ' + value_state_12 + ');\n';
  code += 'digitalWrite(13, ' + value_state_13 + ');\n';
  return code;
};



Blockly.Arduino['dc_motor'] = function (block) {
  var value_channel = Blockly.Arduino.valueToCode(block, 'channel', Blockly.Arduino.ORDER_ATOMIC);
  var value_speed = Blockly.Arduino.valueToCode(block, 'speed', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  Blockly.Arduino.setups_['setup_pin_mode_4'] =  "pinMode(4, OUTPUT);";
  Blockly.Arduino.setups_['setup_pin_mode_2'] = "pinMode(2, OUTPUT);";
  Blockly.Arduino.setups_['setup_pin_mode_7'] = "pinMode(7, OUTPUT);";
  Blockly.Arduino.setups_['digital_write_7'] = "digitalWrite(7,LOW);";
  Blockly.Arduino.setups_['digital_write_3'] = "digitalWrite(2,HIGH);";
  Blockly.Arduino.setups_['setup_pin_mode_6'] = "pinMode(6, OUTPUT);";
  if( (value_speed < -255 ) || (value_speed > 255)) {
    alert("speed should be between -255 to 255")
    return code;
  }
  if ( value_channel == 1) {
    code = "digitalWrite(4,LOW);\n";
    code += "analogWrite(3,"+value_speed+");\n";
  }
  else if(value_channel == 2) {
    code = "digitalWrite(6,LOW);\n";
    code += "analogWrite(5,"+value_speed+");\n";
  }
  return code;
};

Blockly.Arduino['dwenguino_lcd'] = function (block) {
  var value_text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC);
  var value_line_number = Blockly.Arduino.valueToCode(block, 'line_number', Blockly.Arduino.ORDER_ATOMIC);
  var value_character_number = Blockly.Arduino.valueToCode(block, 'character_number', Blockly.Arduino.ORDER_ATOMIC);
  // Assemble JavaScript into code variable.
  //import dwenguino lcd
  value_character_number -= 1;
  value_line_number -= 1;
  if( (value_character_number < 0 ) || (value_character_number > 15 )) {
    alert("character should be between 1 to 16")
    return code;
  }
  Blockly.Arduino.setups_['setup_lcd'] = "lcd.begin(16, 2);"; 
  Blockly.Arduino.definitions_['define_lcd_h'] = "#include <LiquidCrystal.h>\n";
  Blockly.Arduino.definitions_['define_liquid_crystal'] = "LiquidCrystal lcd(8,9,10,11,12,13);"
  var code = 'lcd.setCursor(' + value_character_number + ',' + value_line_number + ');\n';
  code = code + 'lcd.print(' + value_text + ');\n'
  return code;
};

Blockly.Arduino['clear_lcd'] = function (block) {
  //  Assemble JavaScript into code variable.
  var code = 'lcd.clear();\n';
  return code;
};

Blockly.Arduino['sonar_sensor'] = function (block) {
  var value_trig = Blockly.Arduino.valueToCode(block, 'trig', Blockly.Arduino.ORDER_NONE);
  var value_echo = Blockly.Arduino.valueToCode(block, 'echo', Blockly.Arduino.ORDER_NONE);
  //define sonar settings
  Blockly.Arduino.definitions_['define_sonar'] = "int __readUltrasonic_cm(int trigPin, int echoPin)\n{ \
    \n pinMode(trigPin, OUTPUT);\n digitalWrite(trigPin, LOW);\n delayMicroseconds(2);\n digitalWrite(trigPin, HIGH);\
  \n delayMicroseconds(10);\n digitalWrite(trigPin, LOW);\n pinMode(echoPin, INPUT);\n return pulseIn(echoPin, HIGH)/ 29 / 2;\n}\n";
  //  Assemble Arduino into code variable.
  var code = "__readUltrasonic_cm("+value_trig+","+value_echo+")";

  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['remote_sensor'] = function (block) {
  var value_tsop = Blockly.Arduino.valueToCode(block, 'tsop', Blockly.Arduino.ORDER_NONE);
  Blockly.Arduino.definitions_['define_remote'] = "int __remote(int pinNumber)\n{\nint value = 0;\nint time = pulseIn(pinNumber,LOW);\n \
    if(time>2000)\n{\nfor(int counter1=0;counter1<12;counter1++)\n{\nif(pulseIn(pinNumber,LOW)>1000)\n{\nvalue = value + (1<< counter1);\n \
    }\n}\n}\n return value;\n}\n";
  var code = "__remote("+value_tsop+")";
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['dwenguino_servo'] = function (block) {
  var value_channel = Blockly.Arduino.valueToCode(block, 'channel', Blockly.Arduino.ORDER_ATOMIC);
  var value_angle = Blockly.Arduino.valueToCode(block, 'angle', Blockly.Arduino.ORDER_ATOMIC);

  //define sonar settings
  Blockly.Arduino.definitions_['define_servo_h'] = "#include <Servo.h>\n";
  Blockly.Arduino.definitions_['define_servo_' + value_channel] = "Servo servo" + value_channel + ";\n";

  Blockly.Arduino.setups_['define_dwenguino_servo' + value_channel] = 'servo' + value_channel + '.attach('+value_channel+');\n';
  if( (value_angle < 0 ) || (value_angle > 180 )) {
    alert("angle should be between 0 to 180")
    return code;
  }
  // Assemble JavaScript into code variable.
  var code = 'servo' + value_channel + '.write(' + value_angle + ');\n';
  return code;
};

Blockly.Arduino['dwenguino_controls_while'] = function (block) {
  var value_condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_ATOMIC);
  var statements_looped_code = Blockly.Arduino.statementToCode(block, 'LOOPED_CODE');
  //  Assemble Arduino into code variable.
  var code = 'while(' + value_condition + '){\n'
  + statements_looped_code + '\n}\n';
  return code;
};


Blockly.Arduino['dwenguino_constants'] = function (block) {
  var constant_value = block.getFieldValue('DWENGUINO_CONSTANT');
  return [constant_value, Blockly.Arduino.ORDER_ATOMIC];
};
