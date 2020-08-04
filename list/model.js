function Node(val){
	this.val = val;

	this.pre = null;
	this.next = null;
}



testData = [1,2,3,4,5,6]
list = null;

//制造链表
function creatList(arr){
	let countFlag = 0;
	let list = null;

	arr.reduce((prev,cur,index,arr) => {
		let curNode = new Node(cur)
		if(countFlag){
			prev.next = curNode;
		}else{
			list = curNode;
			countFlag++;
		}

		return curNode;
	},null)

	return list;
}

//打印链表
function showList(list){
	console.log(list);
}

//翻转链表
function reverseList(head) {
   
	if(!head)return null
	if(!head.next)return head
   
   
	 let node=reverseList(head.next)
	 head.next.next=head
	 head.next=null 
	 return node 
    
};


//main
function main(){
	list = creatList(testData);
	showList(list)
}