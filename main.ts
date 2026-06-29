input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    logotouch()
})
function logotouch () {
    abbruch=false

    basic.clearScreen()
    robotbit.MotorStopAll()
    basic.showString("L=" + links_rad_faktor)
    autolauf = 0
    basic.pause(500)
    zzz = zzz_start
    let v_arr = "3,4,5,7,8,9,10,11,12,13,14,15,16,10,9,8,7,6,5,4,3".split(",").map(s => parseInt(s))
    for (let index = 0; index <= 4; index++) {
        let add_time = 0
        basic.showLeds(`
            . . # . .
            . # # # .
            # # . # #
            # . . . #
            . . . . .
            `)
        basic.pause(1000)
        for (let j = 0; j <= v_arr.length - 1; j++) {
            zzz = v_arr[j]
            if (j==13) {
                add_time=500
                basic.showLeds(`
                    . . . . .
                    # . . . #
                    # # . # #
                    . # # # .
                    . . # . .
                    `)
                basic.pause(1000)
            }
            // basic.showNumber(zzz % 10)
            // basic.showString("x"+j)
            basic.showString(String.fromCharCode(62+zzz))
            // dauerschleife(1)
            serial.writeValue("zzz", zzz)
            drehimpuls(10 * zzz)
            if (abbruch) {
                j = 99
            }
            basic.pause(500+add_time)
        }
        robotbit.MotorStopAll()
        if (abbruch) {
            index = 99
        }
    }
}
input.onButtonPressed(Button.A, function () {
    abbruch = true
    links_rad_faktor += -0.1
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    // basic.showNumber(links_rad_faktor)
    basic.pause(500)
    logotouch()

})

input.onButtonPressed(Button.B, function () {
    abbruch = true
    links_rad_faktor += 0.1
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    // basic.showNumber(links_rad_faktor)
    basic.pause(500)
    logotouch()
})

function drehimpuls (v: number) {
    robotbit.MotorRunDual(
    robotbit.Motors.M1A,
    v * richtung,
    robotbit.Motors.M2A,
    v * richtung * links_rad_faktor
    )
}
function init () {
    zzz_start = 5
    zzz = zzz_start
    start_speed = 110
    step_size = 10
    links_rad_faktor = 1
    limit = 14
    robotbit.MotorStopAll()
    logotouch()
}
function werte_rechnen (receivedNumber: number) {
    basic.clearScreen()
    if (receivedNumber == 2) {
        zzz = zzz_start
        links_rad_faktor = links_rad_faktor * 1
    }
    if (receivedNumber == -1) {
        zzz_start = zzz_start - 1
        links_rad_faktor = links_rad_faktor * 1
    }
    zzz += receivedNumber
}
input.onButtonPressed(Button.AB, function () {
    zzz_start = zzz_start + -1
    zzz = zzz_start
    init()
})
function dauerschleife (warte: number) {
    basic.showNumber(zzz % 10)
    // zzz += 1
    if (zzz >= limit) {
        zzz = zzz_start
        basic.showIcon(IconNames.Heart)
        drehimpuls(start_speed)
        basic.clearScreen()
    } else {
    	
    }
    speed = zzz * step_size * richtung
    drehimpuls(speed)
    basic.pause(warte)
}
let speed = 0
let limit = 0
let step_size = 0
let start_speed = 0
let abbruch = false
let zzz_start = 0
let zzz = 0
let links_rad_faktor = 0
let autolauf = 0
let richtung = 0
let v_arr2: number[] = []
let wert = 0
// drehimpuls(start_speed)
basic.showIcon(IconNames.Yes)
robotbit.MotorStopAll()
basic.pause(1000)
richtung = 1
autolauf = 0
init()

