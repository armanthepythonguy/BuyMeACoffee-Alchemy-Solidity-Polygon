// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract BuyMeACoffee{

    struct Memo{
        address sender;
        string name;
        string message;
        uint timestamp;
    }

    event MemoReceipt(
        address indexed sender,
        string name,
        string message,
        uint timestamp
    );

    mapping(uint256 => Memo) memos;
    uint256 memosIndex = 0;
    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender==owner, "Only owner can call this function");
        _;
    }

    function buyACoffee(string memory _name, string memory _message) public payable{
        require(msg.value>0, "How can we buy a coffee with 0$ bruhhhh");
        memos[memosIndex] = Memo(msg.sender, _name, _message, block.timestamp);
        memosIndex++;
        emit MemoReceipt(msg.sender, _name, _message, block.timestamp);
    }

    function getMemos() public view returns(Memo[] memory){
        Memo[] memory m = new Memo[](memosIndex);
        uint256 tempIndex = 0;
        for(uint256 i=0; i<memosIndex; i++){
            m[tempIndex] = memos[i];
            tempIndex++;
        }
        return(m);
    }

    function withdrawCoffee() public onlyOwner(){
        require(owner.send(address(this).balance));
    }

}