// 类型转换
// 完整性检查，比较坑的几种类型转换

'0' == false;
// true

false == 0;
// true

false == '';
// true

false == [];
// true

'' == 0;
// true

'' == [];
// true

0 == [];
// true

[] !== [];
// true
// [] !== [] --> [] == false