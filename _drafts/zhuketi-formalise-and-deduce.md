主客体形式化和演绎。





S -> o1,o2,o3   构造函数

等价于 多客体展开，用于编排

S -> o1,
S -> o2,
S -> o3
			builder 模式


S -> o1(S2->o2(s3->o3))  controller -> service-> repository，嵌套深度 = 3，宽度 = 1

等价于
S -> o1(S2->o2)  controller -> service
S-> o2(s3->o3)  controller -> repository，嵌套深度 = 2，宽度 = 2




S -> o1(S2->o2(s3->o3))  ApplicationService -> service1-> service2，嵌套深度 = 3，宽度 = 1

S -> o1(S2->o2)  ApplicationService -> service1
S-> o2(s3->o3)  ApplicationService -> service2，嵌套深度 = 2，宽度 = 2

形式逻辑