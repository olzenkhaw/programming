#NoEnv
#SingleInstance Force
SetWorkingDir %A_ScriptDir%

Gui Add, Edit, x24 y12 w120 h390 vSendData
Gui Add, Text, x24 y420, CMD1
Gui Add, Edit, x58 y416 w84 h20 vSendCommand, {tab}
Gui Add, Text, x24 y448, Sleep
Gui Add, Edit, x58 y444 w84 h20 vSendSleepCommand, 1000
Gui Add, Text, x24 y474, CMD2
Gui Add, Edit, x58 y470 w84 h20 vSendCommand2
Gui Add, Button, x24 y495 w120 h25 gSend, &Send
Gui -MaximizeBox -MinimizeBox +AlwaysOnTop
Gui Show, w170 h525, Fill Data
Return

Send:
GuiControlGet, SendCommand
GuiControlGet, SendCommand2
GuiControlGet, SendSleepCommand
GuiControlGet, SendData
Msgbox, 262144, Fill Data, Please switch!
data := []
loop, Parse, SendData, `n, `r
{
    data[A_Index] := A_LoopField
}
Loop % data.Length(){
    if ((data[A_Index+1] == "") || (A_Index == data.Length()))
    {
        send % data[A_Index]
    }
    else
    {
        send % data[A_Index]SendCommand
        sleep % SendSleepCommand
        send % SendCommand2
    }
}
return

GuiEscape:
GuiClose:
    ExitApp

; Do not edit above this line
