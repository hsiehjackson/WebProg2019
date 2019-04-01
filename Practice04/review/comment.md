# WebProg2019 Pratice-04 Comment
## 1.完成度
70% 僅完成新增todo事項，並未完成remove, complete, showbutton等要求。
## 2.Coding Quality
1. function跟state名字取一樣不太優 Ex：inputText
2. state變化盡量用setState，不要直接去更動 
Ex：``this.state.todoList.push(this.state.inputText);``
=> ``this.setState({todoList: [...this.state.todoList,this.state.inputText]})``
3. handleAddTodo可以就設置 ``event.target.value="":``
## 3.正確性
新增todo事項的功能正確，排版正確，有對input做前處理。可惜少了滿多功能的。

## 4.值得學習的地方
能將複雜的檔案分成不同component，並且完成新增todo事項。

## 5.建議改進的地方
可以嘗試把其他功能都完成，以下是可以參考的資料來源。
Reference：https://www.youtube.com/watch?v=I6IY2TqnPDA&t=1089s

## 6.其他心得
加油！react其實很像在寫verilog XD


