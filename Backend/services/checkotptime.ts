
const otpTime = (regTime: string) => {

    const regtime = regTime as unknown as number
    const time = Date.now()
    const timeDiff = time - regtime
    if (timeDiff > 120000 * 10) {
        console.log((timeDiff/(1000*60)));
        return false
    } else {
        console.log((timeDiff/(1000*60)));

        return true
    }

}

export default otpTime