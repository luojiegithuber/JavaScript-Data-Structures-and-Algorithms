
//树的数据结构
function Tree(root){
	this.root = root //root是节点类型
}

//节点的数据结构
function Node(key,id,data){
	this.key = key; //唯一标识model中的地位
	this.id = id; //唯一标识节点，一个model中可能存在重复的

	this.data = data;

	this.parent = null;//父母节点
	this.childrens = [];//一堆孩子
}

let Root = null;


//测试数据集     @@期望第一个节点就是根节点,其余无所谓
let testArr = [
        { key: "Root", color: "#00C1DE",stroke:"white" },
        { key: "1", parent: "Root", dir: "left",group:"应用" },
        { key: "2", parent: "Root", dir: "left" ,group:"应用"},
        { key: "3", parent: "Root", dir: "left" ,group:"应用"},
        { key: "4", parent: "Root", dir: "left",group:"应用",status:0},
        { key: "5", parent: "4" ,dir:"left",group:"应用2"},
        { key: "6", parent: "4" ,dir:"left",group:"应用2"},
        { key: "7", parent: "Root" , dir: "left",group:"应用"},
        { key: "8", parent: "Root",  group:"GP",dir: "right",},
        { key: "15", parent: "Root",  group:"GP", dir: "right"},
        { key: "9", parent: "Root", group:"HIVE", dir:"right"},
        { key: "10", parent: "9", group:"HIVE2-1",dir:"right" },
        { key: "11", parent: "9", group:"HIVE2-1",dir:"right" },
        { key: "12", parent: "9", group:"HIVE2-2" },
        { key: "13", parent: "Root", group:"HIVE"},
        { key: "14", parent: "Root", group:"HIVE"},
        { key: "16", parent: "13" , group:"HIVE2-3"},
        { key: "17", parent: "13" , group:"HIVE2-3"},
      ];

let newDataArr = [
	{ id:2, data:2, parent:3}
];

//为了查找的性能，建立 id 和 node 索引，方便根据id查找node
let modelDictionary = {};
let nodeDictionary = {};
// @@id很大怎么办？——>哈希数组

//查找字典
function findNodeByKey(key){
	return modelDictionary[key];
}

//将数据放入字典
function addToDictionary(nodeModel){
	modelDictionary[nodeModel.key] = nodeModel;
}

//展示字典
function printDictionary(){
	console.log(modelDictionary);
}

//根据一开始的model 初始化字典
function initDictionary(testArr){
	testArr.forEach(elem=>{
		addToDictionary(elem)
	})
	console.log("数据model字典完成");

}

function visualize(){
	console.log("数据可视化");
}

//打印树
function printTree(){
	console.log(Root)
}

//将model里面的对象转换成Node节点
function modelToNode(nodeModel){
	return new Node(nodeModel.key,null,null)//还没确定 id 和 data
}

let existNode = {};

function getNodeByKey(key){
	return existNode[key]
}

//将 一维数据集 转化成 树
function ArrToTree(testArr){

	let root = modelToNode(testArr[0]);
	existNode[root.key] = root;


	//去掉根节点 生成新节点
	testArr.slice(1).forEach((elem,index,arr) => {

		/* 处理自身的事务 */
		let newNodeModel = findNodeByKey(elem.key); //O(1)
		let selfNode = null;
		
		if(newNodeModel){


			 if(existNode[newNodeModel.key]){
			 	//如果已经存在该树节点
			 	selfNode = existNode[newNodeModel.key] //O(1)
			 }else{
			 	//否则新建节点
			    selfNode = modelToNode(newNodeModel);
			    existNode[selfNode.key] = selfNode;
			 }

		}else{
			console.log("没在字典里找到该节点model？");
			return false;
		}

		/*处理父母事务*/
		let parentNodeModel = findNodeByKey(elem.parent)

		if(parentNodeModel){
			 if(existNode[parentNodeModel.key]){
			 	//如果已经存在该树节点
			 	selfNode.parent = existNode[parentNodeModel.key] //O(1)
			 	selfNode.parent.childrens.push(selfNode);
			 }else{
			 	//否则新建父母节点
			 	let parentNode = modelToNode(parentNodeModel);
			    selfNode.parent = parentNode;

			    parentNode.childrens.push(selfNode);
			    existNode[parentNode.key] = parentNode;
			 }
		}else{
			console.log("没在字典里找到父母节点model？");
			return false;
		}

	})

	console.log("树的转化工作完成")
	return root;

}

function fromChildToRoot(key){
	let result = [];
	let node = getNodeByKey(key);
	let head = node;

	while(head){
		result.push(head);
		head = head.parent;
	}

	return result;
}

//同步函数
function init(testArr){
	initDictionary(testArr);//数据字典
	Root = ArrToTree(testArr);//根据数据字典转化成树
}

var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

//异步函数
async function init_async(testArr){
	console.log("开始异步转换")
	await sleep(1000)
	initDictionary(testArr);//数据字典
	Root = ArrToTree(testArr);//根据数据字典转化成树

	console.log("转化结束")
}

function mainTest(){
	/*请求到了数据，异步处理 数据结构部分*/
    init_async(testArr);

	visualize();//可视化
	setTimeout(()=>{
		console.log("用户操作找根节点");
		console.log(fromChildToRoot("17"));
	},2000)
}