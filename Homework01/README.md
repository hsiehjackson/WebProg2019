WebProg2019 - Homework 1 - README
* Requirement
    * baseline 
        1. 可建立數個todoitems
        2. 可新增刪除任意todoItem
        3. 可勾選已完成的todoItem
        4. 在畫面上顯示已完成的todoItems的不同
        5. 統計並顯示未完成的todoItem數量
    * enhanced
        1. filter 已完成/未完成項目
        2. 一鍵刪除所有已完成項目
        3. *建立電機系最需要的deadline日期
        4. *自動排序將最急迫的todoItem排前面
* Functionalities in html & styles.css
    * 新增date input
    * 調整item顯示日期位置
* Functionalities in main.js
    * addEventListener
        1. 判斷是否有輸入enter，並且省略文字前後空白
        2. 當是第一個物件，會創建 `ul` element
        3. 當是第一個物件，會開啟 `todo_footer`
        4. 將 `itemlist` 依照時間排序
        5. 顯示 `itemcount`
        6. 顯示 `complete clear key`
        7. 顯示 `item`
    * createItem
        1. 設立element該有的attribute
        2. 設id給 `input` `img` `text` 這三個element
        3. 創建item內含node, isComplete, time
    * checkempty
        1. 判斷是否要把 `todo_footer` 藏起來
    * clickcomplete
        1. 將該item的文字變淡並畫中線
        2. 重新顯示 `itemcount` `complete clear key` `item`
    * clickdelete
        1. 把該item從 `todolist` 移除
        2. 刷新所有item的id
        3. 重新顯示 `itemcount` `item`
        4. checkempty
    * clickclean
        1. 把所有complete item從 `todolist` 移除
        2. 刷新所有item的id
        3. 重新顯示 `itemcount` `item`
        4. checkempty
    * clickswitch
        1. 紀錄現在switch狀態
        2. 加深不同的switch button
        3. 剛按下去的不能再按，其他兩鍵可以按
        4. 重新顯示 `item`
    * display_item()
        1. 根據現在switch狀態顯示不同item
    * display_clear()
        1. 當按下去，就讓這個clear按鈕消失
    * display_count()
        1. 顯示現在有多少notComplete item