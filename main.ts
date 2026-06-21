input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    logotouch()
})
function logotouch() {
    robotbit.MotorStopAll()
    basic.showNumber(links_rad_faktor)
    autolauf = 0
    basic.pause(500)
    zzz = zzz_vorgabe
    let v_arr = "7,8,9,10,11,12,13,14,15,16,15,10,9,8,7,6,5,4,3"
        .split(",")
        .map(s => parseInt(s))
    for (let index = 0; index < 5; index++) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            `)
        for (let index2 = 0; index2 <= v_arr.length - 1; index2++) {
            zzz = v_arr[index2]
            if (zzz == 15) {
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    # . . . #
                    . # . # .
                    . . # . .
                    `)
            }
            basic.showNumber(zzz % 10)
            // dauerschleife(1)
            drehimpuls(10 * zzz)
            basic.pause(500)
        }
        robotbit.MotorStopAll()
    }
    basic.showString("E" + links_rad_faktor)
}
input.onButtonPressed(Button.A, function () {
    links_rad_faktor += -0.1
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    basic.showNumber(links_rad_faktor)
})
function drehimpuls(v: number) {
    robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        v * richtung,
        robotbit.Motors.M2A,
        v * richtung * links_rad_faktor
    )
}
function init() {
    zzz_vorgabe = 5
    zzz = zzz_vorgabe
    start_speed = 110
    step_size = 10
    links_rad_faktor = 1
    limit = 14
    // drehimpuls(start_speed)
    basic.showIcon(IconNames.SmallHeart)
    robotbit.MotorStopAll()
    // basic.showNumber(links_rad_faktor)
    basic.showLeds(`
        . . # . .
        . # . # .
        # . # . #
        . . # . .
        . . # . .
        `)
    logotouch()
}
function werte_rechnen(receivedNumber: number) {
    basic.clearScreen()
    if (receivedNumber == 2) {
        zzz = zzz_vorgabe
        links_rad_faktor = links_rad_faktor * 1
    }
    if (receivedNumber == -1) {
        zzz_vorgabe = zzz_vorgabe - 1
        links_rad_faktor = links_rad_faktor * 1
    }
    zzz += receivedNumber
}
input.onButtonPressed(Button.AB, function () {
    zzz_vorgabe = zzz_vorgabe + -1
    zzz = zzz_vorgabe
    init()
})
input.onButtonPressed(Button.B, function () {
    links_rad_faktor += 0.1
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    basic.showNumber(links_rad_faktor)
})
function dauerschleife(warte: number) {
    basic.showNumber(zzz % 10)
    // zzz += 1
    if (zzz >= limit) {
        zzz = zzz_vorgabe
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
let zzz_vorgabe = 0
let zzz = 0
let links_rad_faktor = 0
let autolauf = 0
let richtung = 0
let wert = 0
let v_arr2: number[] = []
robotbit.MotorStopAll()
basic.pause(1000)
richtung = 1
autolauf = 0
init()
basic.forever(function () {
    if (autolauf == 1) {
        dauerschleife(1000)
    }
})
