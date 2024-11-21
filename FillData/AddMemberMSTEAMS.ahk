#NoEnv
#SingleInstance Force
SetWorkingDir %A_ScriptDir%

Gui Add, Edit, x14 y12 w180 h440 vSendData
Gui Add, Text, x24 y468, Sleep (milliseconds)
Gui Add, Edit, x120 y464 w62 h20 vSendSleepCommand, 2000
Gui Add, Button, x24 y495 w160 h25 gSend, &Send
Gui -MaximizeBox -MinimizeBox +AlwaysOnTop
Gui Show, w210 h525, Add Member
Return

Send:
GuiControlGet, SendSleepCommand
GuiControlGet, SendData
Msgbox, 262144, Add Member, Please switch!
WinGet, active_id, ID, A
data := []
loop, Parse, SendData, `n, `r
{
    data[A_Index] := A_LoopField
}
Loop % data.Length(){
    cdata := data[A_Index]
    cdata := StrReplace(cdata, "@moe-dl.edu.my", "")
    send % cdata
    sleep % SendSleepCommand
    send, {tab}
}
return

GuiEscape:
GuiClose:
    ExitApp

; Do not edit above this line
