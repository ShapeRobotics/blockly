// Do not edit this file; automatically generated by build.py.
'use strict';


Blockly.PHP=new Blockly.Generator("PHP");Blockly.PHP.addReservedWords("__halt_compiler,abstract,and,array,as,break,callable,case,catch,class,clone,const,continue,declare,default,die,do,echo,else,elseif,empty,enddeclare,endfor,endforeach,endif,endswitch,endwhile,eval,exit,extends,final,for,foreach,function,global,goto,if,implements,include,include_once,instanceof,insteadof,interface,isset,list,namespace,new,or,print,private,protected,public,require,require_once,return,static,switch,throw,trait,try,unset,use,var,while,xor,PHP_VERSION,PHP_MAJOR_VERSION,PHP_MINOR_VERSION,PHP_RELEASE_VERSION,PHP_VERSION_ID,PHP_EXTRA_VERSION,PHP_ZTS,PHP_DEBUG,PHP_MAXPATHLEN,PHP_OS,PHP_SAPI,PHP_EOL,PHP_INT_MAX,PHP_INT_SIZE,DEFAULT_INCLUDE_PATH,PEAR_INSTALL_DIR,PEAR_EXTENSION_DIR,PHP_EXTENSION_DIR,PHP_PREFIX,PHP_BINDIR,PHP_BINARY,PHP_MANDIR,PHP_LIBDIR,PHP_DATADIR,PHP_SYSCONFDIR,PHP_LOCALSTATEDIR,PHP_CONFIG_FILE_PATH,PHP_CONFIG_FILE_SCAN_DIR,PHP_SHLIB_SUFFIX,E_ERROR,E_WARNING,E_PARSE,E_NOTICE,E_CORE_ERROR,E_CORE_WARNING,E_COMPILE_ERROR,E_COMPILE_WARNING,E_USER_ERROR,E_USER_WARNING,E_USER_NOTICE,E_DEPRECATED,E_USER_DEPRECATED,E_ALL,E_STRICT,__COMPILER_HALT_OFFSET__,TRUE,FALSE,NULL,__CLASS__,__DIR__,__FILE__,__FUNCTION__,__LINE__,__METHOD__,__NAMESPACE__,__TRAIT__");
Blockly.PHP.ORDER_ATOMIC=0;Blockly.PHP.ORDER_CLONE=1;Blockly.PHP.ORDER_NEW=1;Blockly.PHP.ORDER_MEMBER=2.1;Blockly.PHP.ORDER_FUNCTION_CALL=2.2;Blockly.PHP.ORDER_POWER=3;Blockly.PHP.ORDER_INCREMENT=4;Blockly.PHP.ORDER_DECREMENT=4;Blockly.PHP.ORDER_BITWISE_NOT=4;Blockly.PHP.ORDER_CAST=4;Blockly.PHP.ORDER_SUPPRESS_ERROR=4;Blockly.PHP.ORDER_INSTANCEOF=5;Blockly.PHP.ORDER_LOGICAL_NOT=6;Blockly.PHP.ORDER_UNARY_PLUS=7.1;Blockly.PHP.ORDER_UNARY_NEGATION=7.2;Blockly.PHP.ORDER_MULTIPLICATION=8.1;
Blockly.PHP.ORDER_DIVISION=8.2;Blockly.PHP.ORDER_MODULUS=8.3;Blockly.PHP.ORDER_ADDITION=9.1;Blockly.PHP.ORDER_SUBTRACTION=9.2;Blockly.PHP.ORDER_STRING_CONCAT=9.3;Blockly.PHP.ORDER_BITWISE_SHIFT=10;Blockly.PHP.ORDER_RELATIONAL=11;Blockly.PHP.ORDER_EQUALITY=12;Blockly.PHP.ORDER_REFERENCE=13;Blockly.PHP.ORDER_BITWISE_AND=13;Blockly.PHP.ORDER_BITWISE_XOR=14;Blockly.PHP.ORDER_BITWISE_OR=15;Blockly.PHP.ORDER_LOGICAL_AND=16;Blockly.PHP.ORDER_LOGICAL_OR=17;Blockly.PHP.ORDER_IF_NULL=18;
Blockly.PHP.ORDER_CONDITIONAL=19;Blockly.PHP.ORDER_ASSIGNMENT=20;Blockly.PHP.ORDER_LOGICAL_AND_WEAK=21;Blockly.PHP.ORDER_LOGICAL_XOR=22;Blockly.PHP.ORDER_LOGICAL_OR_WEAK=23;Blockly.PHP.ORDER_COMMA=24;Blockly.PHP.ORDER_NONE=99;
Blockly.PHP.ORDER_OVERRIDES=[[Blockly.PHP.ORDER_MEMBER,Blockly.PHP.ORDER_FUNCTION_CALL],[Blockly.PHP.ORDER_MEMBER,Blockly.PHP.ORDER_MEMBER],[Blockly.PHP.ORDER_LOGICAL_NOT,Blockly.PHP.ORDER_LOGICAL_NOT],[Blockly.PHP.ORDER_MULTIPLICATION,Blockly.PHP.ORDER_MULTIPLICATION],[Blockly.PHP.ORDER_ADDITION,Blockly.PHP.ORDER_ADDITION],[Blockly.PHP.ORDER_LOGICAL_AND,Blockly.PHP.ORDER_LOGICAL_AND],[Blockly.PHP.ORDER_LOGICAL_OR,Blockly.PHP.ORDER_LOGICAL_OR]];
Blockly.PHP.init=function(a){Blockly.PHP.definitions_=Object.create(null);Blockly.PHP.functionNames_=Object.create(null);Blockly.PHP.variableDB_?Blockly.PHP.variableDB_.reset():Blockly.PHP.variableDB_=new Blockly.Names(Blockly.PHP.RESERVED_WORDS_,"$");Blockly.PHP.variableDB_.setVariableMap(a.getVariableMap());for(var b=[],c=Blockly.Variables.allDeveloperVariables(a),d=0;d<c.length;d++)b.push(Blockly.PHP.variableDB_.getName(c[d],Blockly.Names.DEVELOPER_VARIABLE_TYPE)+";");a=Blockly.Variables.allUsedVarModels(a);
for(d=0;c=a[d];d++)b.push(Blockly.PHP.variableDB_.getName(c.getId(),Blockly.Variables.NAME_TYPE)+";");Blockly.PHP.definitions_.variables=b.join("\n")};Blockly.PHP.finish=function(a){var b=[],c;for(c in Blockly.PHP.definitions_)b.push(Blockly.PHP.definitions_[c]);delete Blockly.PHP.definitions_;delete Blockly.PHP.functionNames_;Blockly.PHP.variableDB_.reset();return b.join("\n\n")+"\n\n\n"+a};Blockly.PHP.scrubNakedValue=function(a){return a+";\n"};
Blockly.PHP.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/'/g,"\\'");return"'"+a+"'"};
Blockly.PHP.scrub_=function(a,b,c){var d="";if(!a.outputConnection||!a.outputConnection.targetConnection){var e=a.getCommentText();(e=Blockly.utils.wrap(e,Blockly.PHP.COMMENT_WRAP-3))&&(d+=Blockly.PHP.prefixLines(e,"// ")+"\n");for(var f=0;f<a.inputList.length;f++)a.inputList[f].type==Blockly.INPUT_VALUE&&(e=a.inputList[f].connection.targetBlock())&&(e=Blockly.PHP.allNestedComments(e))&&(d+=Blockly.PHP.prefixLines(e,"// "))}a=a.nextConnection&&a.nextConnection.targetBlock();c=c?"":Blockly.PHP.blockToCode(a);
return d+b+c};
Blockly.PHP.getAdjusted=function(a,b,c,d,e){c=c||0;e=e||Blockly.PHP.ORDER_NONE;a.workspace.options.oneBasedIndex&&c--;var f=a.workspace.options.oneBasedIndex?"1":"0";a=0<c?Blockly.PHP.valueToCode(a,b,Blockly.PHP.ORDER_ADDITION)||f:0>c?Blockly.PHP.valueToCode(a,b,Blockly.PHP.ORDER_SUBTRACTION)||f:d?Blockly.PHP.valueToCode(a,b,Blockly.PHP.ORDER_UNARY_NEGATION)||f:Blockly.PHP.valueToCode(a,b,e)||f;if(Blockly.isNumber(a))a=parseFloat(a)+c,d&&(a=-a);else{if(0<c){a=a+" + "+c;var g=Blockly.PHP.ORDER_ADDITION}else 0>c&&
(a=a+" - "+-c,g=Blockly.PHP.ORDER_SUBTRACTION);d&&(a=c?"-("+a+")":"-"+a,g=Blockly.PHP.ORDER_UNARY_NEGATION);g=Math.floor(g);e=Math.floor(e);g&&e>=g&&(a="("+a+")")}return a};Blockly.PHP.colour={};Blockly.PHP.colour_picker=function(a){return["'"+a.getFieldValue("COLOUR")+"'",Blockly.PHP.ORDER_ATOMIC]};Blockly.PHP.colour_random=function(a){return[Blockly.PHP.provideFunction_("colour_random",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"() {","  return '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);","}"])+"()",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.colour_rgb=function(a){var b=Blockly.PHP.valueToCode(a,"RED",Blockly.PHP.ORDER_COMMA)||0,c=Blockly.PHP.valueToCode(a,"GREEN",Blockly.PHP.ORDER_COMMA)||0;a=Blockly.PHP.valueToCode(a,"BLUE",Blockly.PHP.ORDER_COMMA)||0;return[Blockly.PHP.provideFunction_("colour_rgb",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($r, $g, $b) {","  $r = round(max(min($r, 100), 0) * 2.55);","  $g = round(max(min($g, 100), 0) * 2.55);","  $b = round(max(min($b, 100), 0) * 2.55);","  $hex = '#';","  $hex .= str_pad(dechex($r), 2, '0', STR_PAD_LEFT);",
"  $hex .= str_pad(dechex($g), 2, '0', STR_PAD_LEFT);","  $hex .= str_pad(dechex($b), 2, '0', STR_PAD_LEFT);","  return $hex;","}"])+"("+b+", "+c+", "+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.colour_blend=function(a){var b=Blockly.PHP.valueToCode(a,"COLOUR1",Blockly.PHP.ORDER_COMMA)||"'#000000'",c=Blockly.PHP.valueToCode(a,"COLOUR2",Blockly.PHP.ORDER_COMMA)||"'#000000'";a=Blockly.PHP.valueToCode(a,"RATIO",Blockly.PHP.ORDER_COMMA)||.5;return[Blockly.PHP.provideFunction_("colour_blend",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($c1, $c2, $ratio) {","  $ratio = max(min($ratio, 1), 0);","  $r1 = hexdec(substr($c1, 1, 2));","  $g1 = hexdec(substr($c1, 3, 2));","  $b1 = hexdec(substr($c1, 5, 2));",
"  $r2 = hexdec(substr($c2, 1, 2));","  $g2 = hexdec(substr($c2, 3, 2));","  $b2 = hexdec(substr($c2, 5, 2));","  $r = round($r1 * (1 - $ratio) + $r2 * $ratio);","  $g = round($g1 * (1 - $ratio) + $g2 * $ratio);","  $b = round($b1 * (1 - $ratio) + $b2 * $ratio);","  $hex = '#';","  $hex .= str_pad(dechex($r), 2, '0', STR_PAD_LEFT);","  $hex .= str_pad(dechex($g), 2, '0', STR_PAD_LEFT);","  $hex .= str_pad(dechex($b), 2, '0', STR_PAD_LEFT);","  return $hex;","}"])+"("+b+", "+c+", "+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.lists={};Blockly.PHP.lists_create_empty=function(a){return["array()",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.lists_create_with=function(a){for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)b[c]=Blockly.PHP.valueToCode(a,"ADD"+c,Blockly.PHP.ORDER_COMMA)||"null";b="array("+b.join(", ")+")";return[b,Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.lists_repeat=function(a){var b=Blockly.PHP.provideFunction_("lists_repeat",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($value, $count) {","  $array = array();","  for ($index = 0; $index < $count; $index++) {","    $array[] = $value;","  }","  return $array;","}"]),c=Blockly.PHP.valueToCode(a,"ITEM",Blockly.PHP.ORDER_COMMA)||"null";a=Blockly.PHP.valueToCode(a,"NUM",Blockly.PHP.ORDER_COMMA)||"0";return[b+"("+c+", "+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.lists_length=function(a){var b=Blockly.PHP.provideFunction_("length",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($value) {","  if (is_string($value)) {","    return strlen($value);","  } else {","    return count($value);","  }","}"]);a=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"''";return[b+"("+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.lists_isEmpty=function(a){return["empty("+(Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_FUNCTION_CALL)||"array()")+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.lists_indexOf=function(a){var b=Blockly.PHP.valueToCode(a,"FIND",Blockly.PHP.ORDER_NONE)||"''",c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_MEMBER)||"[]";if(a.workspace.options.oneBasedIndex)var d=" 0",e=" + 1";else d=" -1",e="";return[("FIRST"==a.getFieldValue("END")?Blockly.PHP.provideFunction_("indexOf",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($haystack, $needle) {","  for ($index = 0; $index < count($haystack); $index++) {","    if ($haystack[$index] == $needle) return $index"+
e+";","  }","  return "+d+";","}"]):Blockly.PHP.provideFunction_("lastIndexOf",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($haystack, $needle) {","  $last = "+d+";","  for ($index = 0; $index < count($haystack); $index++) {","    if ($haystack[$index] == $needle) $last = $index"+e+";","  }","  return $last;","}"]))+"("+c+", "+b+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.lists_getIndex=function(a){var b=a.getFieldValue("MODE")||"GET";switch(a.getFieldValue("WHERE")||"FROM_START"){case "FIRST":if("GET"==b){var c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_MEMBER)||"array()";return[c+"[0]",Blockly.PHP.ORDER_MEMBER]}if("GET_REMOVE"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"array()",["array_shift("+c+")",Blockly.PHP.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||
"array()","array_shift("+c+");\n";break;case "LAST":if("GET"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"array()",["end("+c+")",Blockly.PHP.ORDER_FUNCTION_CALL];if("GET_REMOVE"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"array()",["array_pop("+c+")",Blockly.PHP.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"array()","array_pop("+c+");\n";break;case "FROM_START":var d=Blockly.PHP.getAdjusted(a,
"AT");if("GET"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_MEMBER)||"array()",[c+"["+d+"]",Blockly.PHP.ORDER_MEMBER];if("GET_REMOVE"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_COMMA)||"array()",["array_splice("+c+", "+d+", 1)[0]",Blockly.PHP.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_COMMA)||"array()","array_splice("+c+", "+d+", 1);\n";break;case "FROM_END":if("GET"==b)return c=Blockly.PHP.valueToCode(a,
"VALUE",Blockly.PHP.ORDER_COMMA)||"array()",d=Blockly.PHP.getAdjusted(a,"AT",1,!0),["array_slice("+c+", "+d+", 1)[0]",Blockly.PHP.ORDER_FUNCTION_CALL];if("GET_REMOVE"==b||"REMOVE"==b){c=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"array()";d=Blockly.PHP.getAdjusted(a,"AT",1,!1,Blockly.PHP.ORDER_SUBTRACTION);c="array_splice("+c+", count("+c+") - "+d+", 1)[0]";if("GET_REMOVE"==b)return[c,Blockly.PHP.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c+";\n"}break;case "RANDOM":c=Blockly.PHP.valueToCode(a,
"VALUE",Blockly.PHP.ORDER_NONE)||"array()";if("GET"==b)return b=Blockly.PHP.provideFunction_("lists_get_random_item",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($list) {","  return $list[rand(0,count($list)-1)];","}"]),[b+"("+c+")",Blockly.PHP.ORDER_FUNCTION_CALL];if("GET_REMOVE"==b)return b=Blockly.PHP.provideFunction_("lists_get_remove_random_item",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"(&$list) {","  $x = rand(0,count($list)-1);","  unset($list[$x]);","  return array_values($list);",
"}"]),[b+"("+c+")",Blockly.PHP.ORDER_FUNCTION_CALL];if("REMOVE"==b)return b=Blockly.PHP.provideFunction_("lists_remove_random_item",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"(&$list) {","  unset($list[rand(0,count($list)-1)]);","}"]),b+"("+c+");\n"}throw Error("Unhandled combination (lists_getIndex).");};
Blockly.PHP.lists_setIndex=function(a){var b=a.getFieldValue("MODE")||"GET",c=a.getFieldValue("WHERE")||"FROM_START",d=Blockly.PHP.valueToCode(a,"TO",Blockly.PHP.ORDER_ASSIGNMENT)||"null";switch(c){case "FIRST":if("SET"==b)return c=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_MEMBER)||"array()",c+"[0] = "+d+";\n";if("INSERT"==b)return c=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_COMMA)||"array()","array_unshift("+c+", "+d+");\n";break;case "LAST":c=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_COMMA)||
"array()";if("SET"==b)return b=Blockly.PHP.provideFunction_("lists_set_last_item",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"(&$list, $value) {","  $list[count($list) - 1] = $value;","}"]),b+"("+c+", "+d+");\n";if("INSERT"==b)return"array_push("+c+", "+d+");\n";break;case "FROM_START":var e=Blockly.PHP.getAdjusted(a,"AT");if("SET"==b)return c=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_MEMBER)||"array()",c+"["+e+"] = "+d+";\n";if("INSERT"==b)return c=Blockly.PHP.valueToCode(a,"LIST",
Blockly.PHP.ORDER_COMMA)||"array()","array_splice("+c+", "+e+", 0, "+d+");\n";break;case "FROM_END":c=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_COMMA)||"array()";e=Blockly.PHP.getAdjusted(a,"AT",1);if("SET"==b)return b=Blockly.PHP.provideFunction_("lists_set_from_end",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"(&$list, $at, $value) {","  $list[count($list) - $at] = $value;","}"]),b+"("+c+", "+e+", "+d+");\n";if("INSERT"==b)return b=Blockly.PHP.provideFunction_("lists_insert_from_end",
["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"(&$list, $at, $value) {","  return array_splice($list, count($list) - $at, 0, $value);","}"]),b+"("+c+", "+e+", "+d+");\n";break;case "RANDOM":c=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_REFERENCE)||"array()";c.match(/^\$\w+$/)?a="":(a=Blockly.PHP.variableDB_.getDistinctName("tmp_list",Blockly.Variables.NAME_TYPE),e=a+" = &"+c+";\n",c=a,a=e);e=Blockly.PHP.variableDB_.getDistinctName("tmp_x",Blockly.Variables.NAME_TYPE);a+=e+" = rand(0, count("+
c+")-1);\n";if("SET"==b)return a+(c+"["+e+"] = "+d+";\n");if("INSERT"==b)return a+("array_splice("+c+", "+e+", 0, "+d+");\n")}throw Error("Unhandled combination (lists_setIndex).");};
Blockly.PHP.lists_getSublist=function(a){var b=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_COMMA)||"array()",c=a.getFieldValue("WHERE1"),d=a.getFieldValue("WHERE2");if("FIRST"!=c||"LAST"!=d)if(b.match(/^\$\w+$/)||"FROM_END"!=c&&"FROM_START"==d){switch(c){case "FROM_START":var e=Blockly.PHP.getAdjusted(a,"AT1");break;case "FROM_END":e=Blockly.PHP.getAdjusted(a,"AT1",1,!1,Blockly.PHP.ORDER_SUBTRACTION);e="count("+b+") - "+e;break;case "FIRST":e="0";break;default:throw Error("Unhandled option (lists_getSublist).");
}switch(d){case "FROM_START":a=Blockly.PHP.getAdjusted(a,"AT2",0,!1,Blockly.PHP.ORDER_SUBTRACTION);c=a+" - ";c=Blockly.isNumber(String(e))||String(e).match(/^\(.+\)$/)?c+e:c+("("+e+")");c+=" + 1";break;case "FROM_END":a=Blockly.PHP.getAdjusted(a,"AT2",0,!1,Blockly.PHP.ORDER_SUBTRACTION);c="count("+b+") - "+a+" - ";c=Blockly.isNumber(String(e))||String(e).match(/^\(.+\)$/)?c+e:c+("("+e+")");break;case "LAST":c="count("+b+") - ";c=Blockly.isNumber(String(e))||String(e).match(/^\(.+\)$/)?c+e:c+("("+
e+")");break;default:throw Error("Unhandled option (lists_getSublist).");}b="array_slice("+b+", "+e+", "+c+")"}else e=Blockly.PHP.getAdjusted(a,"AT1"),a=Blockly.PHP.getAdjusted(a,"AT2"),b=Blockly.PHP.provideFunction_("lists_get_sublist",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($list, $where1, $at1, $where2, $at2) {","  if ($where1 == 'FROM_END') {","    $at1 = count($list) - 1 - $at1;","  } else if ($where1 == 'FIRST') {","    $at1 = 0;","  } else if ($where1 != 'FROM_START'){","    throw new Exception('Unhandled option (lists_get_sublist).');",
"  }","  $length = 0;","  if ($where2 == 'FROM_START') {","    $length = $at2 - $at1 + 1;","  } else if ($where2 == 'FROM_END') {","    $length = count($list) - $at1 - $at2;","  } else if ($where2 == 'LAST') {","    $length = count($list) - $at1;","  } else {","    throw new Exception('Unhandled option (lists_get_sublist).');","  }","  return array_slice($list, $at1, $length);","}"])+"("+b+", '"+c+"', "+e+", '"+d+"', "+a+")";return[b,Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.lists_sort=function(a){var b=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_COMMA)||"array()",c="1"===a.getFieldValue("DIRECTION")?1:-1;a=a.getFieldValue("TYPE");return[Blockly.PHP.provideFunction_("lists_sort",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($list, $type, $direction) {","  $sortCmpFuncs = array(",'    "NUMERIC" => "strnatcasecmp",','    "TEXT" => "strcmp",','    "IGNORE_CASE" => "strcasecmp"',"  );","  $sortCmp = $sortCmpFuncs[$type];","  $list2 = $list;","  usort($list2, $sortCmp);",
"  if ($direction == -1) {","    $list2 = array_reverse($list2);","  }","  return $list2;","}"])+"("+b+', "'+a+'", '+c+")",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.lists_split=function(a){var b=Blockly.PHP.valueToCode(a,"INPUT",Blockly.PHP.ORDER_COMMA),c=Blockly.PHP.valueToCode(a,"DELIM",Blockly.PHP.ORDER_COMMA)||"''";a=a.getFieldValue("MODE");if("SPLIT"==a)b||(b="''"),a="explode";else if("JOIN"==a)b||(b="array()"),a="implode";else throw Error("Unknown mode: "+a);return[a+"("+c+", "+b+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.lists_reverse=function(a){return["array_reverse("+(Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_COMMA)||"[]")+")",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.logic={};Blockly.PHP.controls_if=function(a){var b=0,c="";do{var d=Blockly.PHP.valueToCode(a,"IF"+b,Blockly.PHP.ORDER_NONE)||"false";var e=Blockly.PHP.statementToCode(a,"DO"+b);c+=(0<b?" else ":"")+"if ("+d+") {\n"+e+"}";++b}while(a.getInput("IF"+b));a.getInput("ELSE")&&(e=Blockly.PHP.statementToCode(a,"ELSE"),c+=" else {\n"+e+"}");return c+"\n"};Blockly.PHP.controls_ifelse=Blockly.PHP.controls_if;
Blockly.PHP.logic_compare=function(a){var b={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="}[a.getFieldValue("OP")],c="=="==b||"!="==b?Blockly.PHP.ORDER_EQUALITY:Blockly.PHP.ORDER_RELATIONAL,d=Blockly.PHP.valueToCode(a,"A",c)||"0";a=Blockly.PHP.valueToCode(a,"B",c)||"0";return[d+" "+b+" "+a,c]};
Blockly.PHP.logic_operation=function(a){var b="AND"==a.getFieldValue("OP")?"&&":"||",c="&&"==b?Blockly.PHP.ORDER_LOGICAL_AND:Blockly.PHP.ORDER_LOGICAL_OR,d=Blockly.PHP.valueToCode(a,"A",c);a=Blockly.PHP.valueToCode(a,"B",c);if(d||a){var e="&&"==b?"true":"false";d||(d=e);a||(a=e)}else a=d="false";return[d+" "+b+" "+a,c]};Blockly.PHP.logic_negate=function(a){var b=Blockly.PHP.ORDER_LOGICAL_NOT;return["!"+(Blockly.PHP.valueToCode(a,"BOOL",b)||"true"),b]};
Blockly.PHP.logic_boolean=function(a){return["TRUE"==a.getFieldValue("BOOL")?"true":"false",Blockly.PHP.ORDER_ATOMIC]};Blockly.PHP.logic_null=function(a){return["null",Blockly.PHP.ORDER_ATOMIC]};Blockly.PHP.logic_ternary=function(a){var b=Blockly.PHP.valueToCode(a,"IF",Blockly.PHP.ORDER_CONDITIONAL)||"false",c=Blockly.PHP.valueToCode(a,"THEN",Blockly.PHP.ORDER_CONDITIONAL)||"null";a=Blockly.PHP.valueToCode(a,"ELSE",Blockly.PHP.ORDER_CONDITIONAL)||"null";return[b+" ? "+c+" : "+a,Blockly.PHP.ORDER_CONDITIONAL]};Blockly.PHP.loops={};
Blockly.PHP.controls_repeat_ext=function(a){var b=a.getField("TIMES")?String(Number(a.getFieldValue("TIMES"))):Blockly.PHP.valueToCode(a,"TIMES",Blockly.PHP.ORDER_ASSIGNMENT)||"0",c=Blockly.PHP.statementToCode(a,"DO");c=Blockly.PHP.addLoopTrap(c,a.id);a="";var d=Blockly.PHP.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE),e=b;b.match(/^\w+$/)||Blockly.isNumber(b)||(e=Blockly.PHP.variableDB_.getDistinctName("repeat_end",Blockly.Variables.NAME_TYPE),a+=e+" = "+b+";\n");return a+("for ("+
d+" = 0; "+d+" < "+e+"; "+d+"++) {\n"+c+"}\n")};Blockly.PHP.controls_repeat=Blockly.PHP.controls_repeat_ext;Blockly.PHP.controls_whileUntil=function(a){var b="UNTIL"==a.getFieldValue("MODE"),c=Blockly.PHP.valueToCode(a,"BOOL",b?Blockly.PHP.ORDER_LOGICAL_NOT:Blockly.PHP.ORDER_NONE)||"false",d=Blockly.PHP.statementToCode(a,"DO");d=Blockly.PHP.addLoopTrap(d,a.id);b&&(c="!"+c);return"while ("+c+") {\n"+d+"}\n"};
Blockly.PHP.controls_for=function(a){var b=Blockly.PHP.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.PHP.valueToCode(a,"FROM",Blockly.PHP.ORDER_ASSIGNMENT)||"0",d=Blockly.PHP.valueToCode(a,"TO",Blockly.PHP.ORDER_ASSIGNMENT)||"0",e=Blockly.PHP.valueToCode(a,"BY",Blockly.PHP.ORDER_ASSIGNMENT)||"1",f=Blockly.PHP.statementToCode(a,"DO");f=Blockly.PHP.addLoopTrap(f,a.id);if(Blockly.isNumber(c)&&Blockly.isNumber(d)&&Blockly.isNumber(e)){var g=parseFloat(c)<=parseFloat(d);
a="for ("+b+" = "+c+"; "+b+(g?" <= ":" >= ")+d+"; "+b;b=Math.abs(parseFloat(e));a=(1==b?a+(g?"++":"--"):a+((g?" += ":" -= ")+b))+(") {\n"+f+"}\n")}else a="",g=c,c.match(/^\w+$/)||Blockly.isNumber(c)||(g=Blockly.PHP.variableDB_.getDistinctName(b+"_start",Blockly.Variables.NAME_TYPE),a+=g+" = "+c+";\n"),c=d,d.match(/^\w+$/)||Blockly.isNumber(d)||(c=Blockly.PHP.variableDB_.getDistinctName(b+"_end",Blockly.Variables.NAME_TYPE),a+=c+" = "+d+";\n"),d=Blockly.PHP.variableDB_.getDistinctName(b+"_inc",Blockly.Variables.NAME_TYPE),
a+=d+" = ",a=Blockly.isNumber(e)?a+(Math.abs(e)+";\n"):a+("abs("+e+");\n"),a=a+("if ("+g+" > "+c+") {\n")+(Blockly.PHP.INDENT+d+" = -"+d+";\n"),a+="}\n",a+="for ("+b+" = "+g+"; "+d+" >= 0 ? "+b+" <= "+c+" : "+b+" >= "+c+"; "+b+" += "+d+") {\n"+f+"}\n";return a};
Blockly.PHP.controls_forEach=function(a){var b=Blockly.PHP.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_ASSIGNMENT)||"[]",d=Blockly.PHP.statementToCode(a,"DO");d=Blockly.PHP.addLoopTrap(d,a.id);return"foreach ("+c+" as "+b+") {\n"+d+"}\n"};
Blockly.PHP.controls_flow_statements=function(a){switch(a.getFieldValue("FLOW")){case "BREAK":return"break;\n";case "CONTINUE":return"continue;\n"}throw Error("Unknown flow statement.");};Blockly.PHP.math={};Blockly.PHP.math_number=function(a){a=parseFloat(a.getFieldValue("NUM"));var b=0<=a?Blockly.PHP.ORDER_ATOMIC:Blockly.PHP.ORDER_UNARY_NEGATION;Infinity==a?a="INF":-Infinity==a&&(a="-INF");return[a,b]};
Blockly.PHP.math_arithmetic=function(a){var b={ADD:[" + ",Blockly.PHP.ORDER_ADDITION],MINUS:[" - ",Blockly.PHP.ORDER_SUBTRACTION],MULTIPLY:[" * ",Blockly.PHP.ORDER_MULTIPLICATION],DIVIDE:[" / ",Blockly.PHP.ORDER_DIVISION],POWER:[" ** ",Blockly.PHP.ORDER_POWER]}[a.getFieldValue("OP")],c=b[0];b=b[1];var d=Blockly.PHP.valueToCode(a,"A",b)||"0";a=Blockly.PHP.valueToCode(a,"B",b)||"0";return[d+c+a,b]};
Blockly.PHP.math_single=function(a){var b=a.getFieldValue("OP");if("NEG"==b)return a=Blockly.PHP.valueToCode(a,"NUM",Blockly.PHP.ORDER_UNARY_NEGATION)||"0","-"==a[0]&&(a=" "+a),["-"+a,Blockly.PHP.ORDER_UNARY_NEGATION];a="SIN"==b||"COS"==b||"TAN"==b?Blockly.PHP.valueToCode(a,"NUM",Blockly.PHP.ORDER_DIVISION)||"0":Blockly.PHP.valueToCode(a,"NUM",Blockly.PHP.ORDER_NONE)||"0";switch(b){case "ABS":var c="abs("+a+")";break;case "ROOT":c="sqrt("+a+")";break;case "LN":c="log("+a+")";break;case "EXP":c="exp("+
a+")";break;case "POW10":c="pow(10,"+a+")";break;case "ROUND":c="round("+a+")";break;case "ROUNDUP":c="ceil("+a+")";break;case "ROUNDDOWN":c="floor("+a+")";break;case "SIN":c="sin("+a+" / 180 * pi())";break;case "COS":c="cos("+a+" / 180 * pi())";break;case "TAN":c="tan("+a+" / 180 * pi())"}if(c)return[c,Blockly.PHP.ORDER_FUNCTION_CALL];switch(b){case "LOG10":c="log("+a+") / log(10)";break;case "ASIN":c="asin("+a+") / pi() * 180";break;case "ACOS":c="acos("+a+") / pi() * 180";break;case "ATAN":c="atan("+
a+") / pi() * 180";break;default:throw Error("Unknown math operator: "+b);}return[c,Blockly.PHP.ORDER_DIVISION]};Blockly.PHP.math_constant=function(a){return{PI:["M_PI",Blockly.PHP.ORDER_ATOMIC],E:["M_E",Blockly.PHP.ORDER_ATOMIC],GOLDEN_RATIO:["(1 + sqrt(5)) / 2",Blockly.PHP.ORDER_DIVISION],SQRT2:["M_SQRT2",Blockly.PHP.ORDER_ATOMIC],SQRT1_2:["M_SQRT1_2",Blockly.PHP.ORDER_ATOMIC],INFINITY:["INF",Blockly.PHP.ORDER_ATOMIC]}[a.getFieldValue("CONSTANT")]};
Blockly.PHP.math_number_property=function(a){var b=Blockly.PHP.valueToCode(a,"NUMBER_TO_CHECK",Blockly.PHP.ORDER_MODULUS)||"0",c=a.getFieldValue("PROPERTY");if("PRIME"==c)return[Blockly.PHP.provideFunction_("math_isPrime",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($n) {","  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods","  if ($n == 2 || $n == 3) {","    return true;","  }","  // False if n is NaN, negative, is 1, or not whole.","  // And false if n is divisible by 2 or 3.",
"  if (!is_numeric($n) || $n <= 1 || $n % 1 != 0 || $n % 2 == 0 || $n % 3 == 0) {","    return false;","  }","  // Check all the numbers of form 6k +/- 1, up to sqrt(n).","  for ($x = 6; $x <= sqrt($n) + 1; $x += 6) {","    if ($n % ($x - 1) == 0 || $n % ($x + 1) == 0) {","      return false;","    }","  }","  return true;","}"])+"("+b+")",Blockly.JavaScript.ORDER_FUNCTION_CALL];switch(c){case "EVEN":var d=b+" % 2 == 0";break;case "ODD":d=b+" % 2 == 1";break;case "WHOLE":d="is_int("+b+")";break;case "POSITIVE":d=
b+" > 0";break;case "NEGATIVE":d=b+" < 0";break;case "DIVISIBLE_BY":a=Blockly.PHP.valueToCode(a,"DIVISOR",Blockly.PHP.ORDER_MODULUS)||"0",d=b+" % "+a+" == 0"}return[d,Blockly.PHP.ORDER_EQUALITY]};Blockly.PHP.math_change=function(a){var b=Blockly.PHP.valueToCode(a,"DELTA",Blockly.PHP.ORDER_ADDITION)||"0";return Blockly.PHP.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+" += "+b+";\n"};Blockly.PHP.math_round=Blockly.PHP.math_single;Blockly.PHP.math_trig=Blockly.PHP.math_single;
Blockly.PHP.math_on_list=function(a){var b=a.getFieldValue("OP");switch(b){case "SUM":a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_FUNCTION_CALL)||"array()";a="array_sum("+a+")";break;case "MIN":a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_FUNCTION_CALL)||"array()";a="min("+a+")";break;case "MAX":a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_FUNCTION_CALL)||"array()";a="max("+a+")";break;case "AVERAGE":b=Blockly.PHP.provideFunction_("math_mean",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+
"($myList) {","  return array_sum($myList) / count($myList);","}"]);a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_NONE)||"array()";a=b+"("+a+")";break;case "MEDIAN":b=Blockly.PHP.provideFunction_("math_median",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($arr) {","  sort($arr,SORT_NUMERIC);","  return (count($arr) % 2) ? $arr[floor(count($arr)/2)] : ","      ($arr[floor(count($arr)/2)] + $arr[floor(count($arr)/2) - 1]) / 2;","}"]);a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_NONE)||
"[]";a=b+"("+a+")";break;case "MODE":b=Blockly.PHP.provideFunction_("math_modes",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($values) {","  if (empty($values)) return array();","  $counts = array_count_values($values);","  arsort($counts); // Sort counts in descending order","  $modes = array_keys($counts, current($counts), true);","  return $modes;","}"]);a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_NONE)||"[]";a=b+"("+a+")";break;case "STD_DEV":b=Blockly.PHP.provideFunction_("math_standard_deviation",
["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($numbers) {","  $n = count($numbers);","  if (!$n) return null;","  $mean = array_sum($numbers) / count($numbers);","  foreach($numbers as $key => $num) $devs[$key] = pow($num - $mean, 2);","  return sqrt(array_sum($devs) / (count($devs) - 1));","}"]);a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_NONE)||"[]";a=b+"("+a+")";break;case "RANDOM":b=Blockly.PHP.provideFunction_("math_random_list",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+
"($list) {","  $x = rand(0, count($list)-1);","  return $list[$x];","}"]);a=Blockly.PHP.valueToCode(a,"LIST",Blockly.PHP.ORDER_NONE)||"[]";a=b+"("+a+")";break;default:throw Error("Unknown operator: "+b);}return[a,Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.math_modulo=function(a){var b=Blockly.PHP.valueToCode(a,"DIVIDEND",Blockly.PHP.ORDER_MODULUS)||"0";a=Blockly.PHP.valueToCode(a,"DIVISOR",Blockly.PHP.ORDER_MODULUS)||"0";return[b+" % "+a,Blockly.PHP.ORDER_MODULUS]};
Blockly.PHP.math_constrain=function(a){var b=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_COMMA)||"0",c=Blockly.PHP.valueToCode(a,"LOW",Blockly.PHP.ORDER_COMMA)||"0";a=Blockly.PHP.valueToCode(a,"HIGH",Blockly.PHP.ORDER_COMMA)||"Infinity";return["min(max("+b+", "+c+"), "+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.math_random_int=function(a){var b=Blockly.PHP.valueToCode(a,"FROM",Blockly.PHP.ORDER_COMMA)||"0";a=Blockly.PHP.valueToCode(a,"TO",Blockly.PHP.ORDER_COMMA)||"0";return[Blockly.PHP.provideFunction_("math_random_int",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($a, $b) {","  if ($a > $b) {","    return rand($b, $a);","  }","  return rand($a, $b);","}"])+"("+b+", "+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.math_random_float=function(a){return["(float)rand()/(float)getrandmax()",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.math_atan2=function(a){var b=Blockly.PHP.valueToCode(a,"X",Blockly.PHP.ORDER_COMMA)||"0";return["atan2("+(Blockly.PHP.valueToCode(a,"Y",Blockly.PHP.ORDER_COMMA)||"0")+", "+b+") / pi() * 180",Blockly.PHP.ORDER_DIVISION]};Blockly.PHP.procedures={};
Blockly.PHP.procedures_defreturn=function(a){for(var b=[],c,d=a.workspace,e=Blockly.Variables.allUsedVarModels(d)||[],f=0;c=e[f];f++)c=c.name,-1==a.arguments_.indexOf(c)&&b.push(Blockly.PHP.variableDB_.getName(c,Blockly.Variables.NAME_TYPE));d=Blockly.Variables.allDeveloperVariables(d);for(f=0;f<d.length;f++)b.push(Blockly.PHP.variableDB_.getName(d[f],Blockly.Names.DEVELOPER_VARIABLE_TYPE));b=b.length?Blockly.PHP.INDENT+"global "+b.join(", ")+";\n":"";d=Blockly.PHP.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE);
e=Blockly.PHP.statementToCode(a,"STACK");Blockly.PHP.STATEMENT_PREFIX&&(f=a.id.replace(/\$/g,"$$$$"),e=Blockly.PHP.prefixLines(Blockly.PHP.STATEMENT_PREFIX.replace(/%1/g,"'"+f+"'"),Blockly.PHP.INDENT)+e);Blockly.PHP.INFINITE_LOOP_TRAP&&(e=Blockly.PHP.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+a.id+"'")+e);(c=Blockly.PHP.valueToCode(a,"RETURN",Blockly.PHP.ORDER_NONE)||"")&&(c=Blockly.PHP.INDENT+"return "+c+";\n");var g=[];for(f=0;f<a.arguments_.length;f++)g[f]=Blockly.PHP.variableDB_.getName(a.arguments_[f],
Blockly.Variables.NAME_TYPE);b="function "+d+"("+g.join(", ")+") {\n"+b+e+c+"}";b=Blockly.PHP.scrub_(a,b);Blockly.PHP.definitions_["%"+d]=b;return null};Blockly.PHP.procedures_defnoreturn=Blockly.PHP.procedures_defreturn;Blockly.PHP.procedures_callreturn=function(a){for(var b=Blockly.PHP.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.PHP.valueToCode(a,"ARG"+d,Blockly.PHP.ORDER_COMMA)||"null";return[b+"("+c.join(", ")+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.procedures_callnoreturn=function(a){for(var b=Blockly.PHP.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.PHP.valueToCode(a,"ARG"+d,Blockly.PHP.ORDER_COMMA)||"null";return b+"("+c.join(", ")+");\n"};
Blockly.PHP.procedures_ifreturn=function(a){var b="if ("+(Blockly.PHP.valueToCode(a,"CONDITION",Blockly.PHP.ORDER_NONE)||"false")+") {\n";a.hasReturnValue_?(a=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"null",b+=Blockly.PHP.INDENT+"return "+a+";\n"):b+=Blockly.PHP.INDENT+"return;\n";return b+"}\n"};Blockly.PHP.texts={};Blockly.PHP.text=function(a){return[Blockly.PHP.quote_(a.getFieldValue("TEXT")),Blockly.PHP.ORDER_ATOMIC]};
Blockly.PHP.text_join=function(a){if(0==a.itemCount_)return["''",Blockly.PHP.ORDER_ATOMIC];if(1==a.itemCount_)return[Blockly.PHP.valueToCode(a,"ADD0",Blockly.PHP.ORDER_NONE)||"''",Blockly.PHP.ORDER_FUNCTION_CALL];if(2==a.itemCount_){var b=Blockly.PHP.valueToCode(a,"ADD0",Blockly.PHP.ORDER_NONE)||"''";a=Blockly.PHP.valueToCode(a,"ADD1",Blockly.PHP.ORDER_NONE)||"''";return[b+" . "+a,Blockly.PHP.ORDER_ADDITION]}b=Array(a.itemCount_);for(var c=0;c<a.itemCount_;c++)b[c]=Blockly.PHP.valueToCode(a,"ADD"+
c,Blockly.PHP.ORDER_COMMA)||"''";a="implode('', array("+b.join(",")+"))";return[a,Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.text_append=function(a){var b=Blockly.PHP.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);a=Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_ASSIGNMENT)||"''";return b+" .= "+a+";\n"};
Blockly.PHP.text_length=function(a){var b=Blockly.PHP.provideFunction_("length",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($value) {","  if (is_string($value)) {","    return strlen($value);","  } else {","    return count($value);","  }","}"]);a=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"''";return[b+"("+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.text_isEmpty=function(a){return["empty("+(Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"''")+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.text_indexOf=function(a){var b="FIRST"==a.getFieldValue("END")?"strpos":"strrpos",c=Blockly.PHP.valueToCode(a,"FIND",Blockly.PHP.ORDER_NONE)||"''",d=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_NONE)||"''";if(a.workspace.options.oneBasedIndex)var e=" 0",f=" + 1";else e=" -1",f="";return[Blockly.PHP.provideFunction_("FIRST"==a.getFieldValue("END")?"text_indexOf":"text_lastIndexOf",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($text, $search) {","  $pos = "+b+"($text, $search);",
"  return $pos === false ? "+e+" : $pos"+f+";","}"])+"("+d+", "+c+")",Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.text_charAt=function(a){var b=a.getFieldValue("WHERE")||"FROM_START",c=Blockly.PHP.valueToCode(a,"VALUE","RANDOM"==b?Blockly.PHP.ORDER_NONE:Blockly.PHP.ORDER_COMMA)||"''";switch(b){case "FIRST":return["substr("+c+", 0, 1)",Blockly.PHP.ORDER_FUNCTION_CALL];case "LAST":return["substr("+c+", -1)",Blockly.PHP.ORDER_FUNCTION_CALL];case "FROM_START":return a=Blockly.PHP.getAdjusted(a,"AT"),["substr("+c+", "+a+", 1)",Blockly.PHP.ORDER_FUNCTION_CALL];case "FROM_END":return a=Blockly.PHP.getAdjusted(a,
"AT",1,!0),["substr("+c+", "+a+", 1)",Blockly.PHP.ORDER_FUNCTION_CALL];case "RANDOM":return[Blockly.PHP.provideFunction_("text_random_letter",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($text) {","  return $text[rand(0, strlen($text) - 1)];","}"])+"("+c+")",Blockly.PHP.ORDER_FUNCTION_CALL]}throw Error("Unhandled option (text_charAt).");};
Blockly.PHP.text_getSubstring=function(a){var b=Blockly.PHP.valueToCode(a,"STRING",Blockly.PHP.ORDER_FUNCTION_CALL)||"''",c=a.getFieldValue("WHERE1"),d=a.getFieldValue("WHERE2");if("FIRST"!=c||"LAST"!=d){var e=Blockly.PHP.getAdjusted(a,"AT1");a=Blockly.PHP.getAdjusted(a,"AT2");b=Blockly.PHP.provideFunction_("text_get_substring",["function "+Blockly.PHP.FUNCTION_NAME_PLACEHOLDER_+"($text, $where1, $at1, $where2, $at2) {","  if ($where1 == 'FROM_END') {","    $at1 = strlen($text) - 1 - $at1;","  } else if ($where1 == 'FIRST') {",
"    $at1 = 0;","  } else if ($where1 != 'FROM_START'){","    throw new Exception('Unhandled option (text_get_substring).');","  }","  $length = 0;","  if ($where2 == 'FROM_START') {","    $length = $at2 - $at1 + 1;","  } else if ($where2 == 'FROM_END') {","    $length = strlen($text) - $at1 - $at2;","  } else if ($where2 == 'LAST') {","    $length = strlen($text) - $at1;","  } else {","    throw new Exception('Unhandled option (text_get_substring).');","  }","  return substr($text, $at1, $length);",
"}"])+"("+b+", '"+c+"', "+e+", '"+d+"', "+a+")"}return[b,Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.text_changeCase=function(a){var b=Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_NONE)||"''";if("UPPERCASE"==a.getFieldValue("CASE"))var c="strtoupper("+b+")";else"LOWERCASE"==a.getFieldValue("CASE")?c="strtolower("+b+")":"TITLECASE"==a.getFieldValue("CASE")&&(c="ucwords(strtolower("+b+"))");return[c,Blockly.PHP.ORDER_FUNCTION_CALL]};
Blockly.PHP.text_trim=function(a){var b={LEFT:"ltrim",RIGHT:"rtrim",BOTH:"trim"}[a.getFieldValue("MODE")];a=Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_NONE)||"''";return[b+"("+a+")",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.text_print=function(a){return"print("+(Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_NONE)||"''")+");\n"};
Blockly.PHP.text_prompt_ext=function(a){var b="readline("+(a.getField("TEXT")?Blockly.PHP.quote_(a.getFieldValue("TEXT")):Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_NONE)||"''")+")";"NUMBER"==a.getFieldValue("TYPE")&&(b="floatval("+b+")");return[b,Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.text_prompt=Blockly.PHP.text_prompt_ext;
Blockly.PHP.text_count=function(a){var b=Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_MEMBER)||"''";a=Blockly.PHP.valueToCode(a,"SUB",Blockly.PHP.ORDER_NONE)||"''";return["strlen("+a+") === 0 ? strlen("+b+") + 1 : substr_count("+b+", "+a+")",Blockly.PHP.ORDER_CONDITIONAL]};
Blockly.PHP.text_replace=function(a){var b=Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_MEMBER)||"''",c=Blockly.PHP.valueToCode(a,"FROM",Blockly.PHP.ORDER_NONE)||"''";a=Blockly.PHP.valueToCode(a,"TO",Blockly.PHP.ORDER_NONE)||"''";return["str_replace("+c+", "+a+", "+b+")",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.text_reverse=function(a){return["strrev("+(Blockly.PHP.valueToCode(a,"TEXT",Blockly.PHP.ORDER_MEMBER)||"''")+")",Blockly.PHP.ORDER_FUNCTION_CALL]};Blockly.PHP.variables={};Blockly.PHP.variables_get=function(a){return[Blockly.PHP.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),Blockly.PHP.ORDER_ATOMIC]};Blockly.PHP.variables_set=function(a){var b=Blockly.PHP.valueToCode(a,"VALUE",Blockly.PHP.ORDER_ASSIGNMENT)||"0";return Blockly.PHP.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+" = "+b+";\n"};
Blockly.PHP.variablesDynamic={};Blockly.PHP.variables_get_dynamic=Blockly.PHP.variables_get;Blockly.PHP.variables_set_dynamic=Blockly.PHP.variables_set;