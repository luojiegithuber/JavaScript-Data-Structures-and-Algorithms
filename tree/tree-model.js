
//树的数据结构
function Tree(root){
	this.root = root //root是节点类型
	this.height = 0;
}

//节点的数据结构
function Node(id,data){
	this.id = id; //唯一标识节点
	this.parent = null;//父母节点

	this.data = data;
	this.leftChild = null;
	this.rightChild = null;
}

let Root = null;


//测试数据集     @@期望第一个节点就是根节点,其余无所谓
/*let testArr = [
	{ id:1, data:1, parent:null},  //无父母就是根节点
	{ id:2, data:2, parent:1 },
	{ id:3, data:3, parent:1 },
	{ id:4, data:4, parent:2 },
	{ id:5, data:5, parent:2 },
	{ id:6, data:6, parent:3 },
	{ id:7, data:7, parent:6 },
];*/

let testArr = [
	{ id:1, data:1, parent:null},  //无父母就是根节点
	{ id:2, data:2, parent:1 },
	{ id:3, data:3, parent:1 },
	{ id:4, data:4, parent:2 },
	{ id:5, data:5, parent:2 },
	{ id:6, data:6, parent:3 },
	{ id:7, data:7, parent:3 },
];



let newDataArr = [
	{ id:2, data:2, parent:3}
];

//为了查找的性能，建立 id 和 node 索引，方便根据id查找node
let idDictionary = {};
// @@id很大怎么办？——>哈希数组

//查找字典
function findNodeByKey(id){
	return idDictionary[id];
}

//放入字典
function addToDictionary(node){
	idDictionary[node.id] = node;
}

//展示字典
function printDictionary(){
	console.log(idDictionary);
}

//打印树
function printTree(){
	console.log(Root)
}


let count = 0;
let maxDepth = 0;


var maxDepth = function(root) {
    if (!root) return 0;
    else {
        let leftDepth = maxDepth(root.left),
            rightDepth = maxDepth(root.right);
        let childDepth = leftDepth > rightDepth ? leftDepth : rightDepth;
        return childDepth + 1;
    }
};


function countDepth(Root){
    
    //判空
    if(!Root){return maxDepth;}

    //访问得到就能++count
	count++;

	if(count>maxDepth){maxDepth = count;}

	countDepth(Root.leftChild);
	countDepth(Root.rightChild);

	count--;//递归出来要减去1
	return maxDepth;
}


//将 一维数据集 转化成 树
function ArrToTree(testArr){

	let root = null

	//提取根元素
	if(!testArr[0].parent){
		root = new Node(testArr[0].id,testArr[0].data);
		addToDictionary(root);
	}else{
		alert("第一个元素不是根节点！");
		return false;
	}

	//去掉根节点 生成新节点
	testArr.slice(1).forEach((elem,index,arr) => {

		/* 处理自身的事务 */
		let newNode = findNodeByKey(elem.id);
		
		if(newNode){
			//若之前已经有孩子帮忙做好躯壳了
			newNode.data = elem.data;
		}else{
			//否则新建，加入字典
			newNode = new Node(elem.id,elem.data);
		    addToDictionary(newNode);
		}

		/*处理父母事务*/
		let parentNode = findNodeByKey(elem.parent)
		if(parentNode){
			//若父母存在，直接赋值
			newNode.parent = parentNode;
			if(!parentNode.leftChild){ parentNode.leftChild = newNode; }
			else if(!parentNode.rightChild){ parentNode.rightChild = newNode; }
			else{
				alert("存在一个父母有三个子节点的情况！");
				return false;
			}
		}else{
			//若父母还未遍历到，则先建立父母的躯壳
			parentNode = new Node(elem.parent);
			addToDictionary(newNode);
		}

	})

	return root;

}


//二叉树翻转
function reverseTree(node){
	let temp = node.leftChild;
	node.leftChild = node.rightChild;
	node.rightChild = temp;

	if(node.leftChild){
		reverseTree(node.leftChild);
	}

	if(node.rightChild){
		reverseTree(node.rightChild);
	}
}


//从上到下打印二叉树
function printTreeBFS(node){
	let depth = 0;
	let arr = [];

	function countDepth(Root){
	    
	    //判空
	    if(!Root){return 0;}

	    //访问得到就能++count
		depth++;
		arr[depth]=Root.data;

		if(count>maxDepth){maxDepth = count;}

		countDepth(Root.leftChild);
		countDepth(Root.rightChild);

		count--;//递归出来要减去1
		return maxDepth;
	}



}


//主函数
function main(){
	Root = ArrToTree(testArr);
	console.log(Root);
	reverseTree(Root);
	console.log(Root);
}