export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request) {
  var reason = ""
  var isThala = false

  try {
    const reqData = await request.json()
    const thalaValue = reqData.thalaValue

    if (!isNaN(thalaValue)) {
      // Received Number from user

      let numberInThala = thalaValue.toString().split('')
      var finalSum = 0
      while (numberInThala.length > 1) {
        var sum = 0
        numberInThala.forEach(element => {
          sum += Number(element)
        })
        finalSum = sum
        reason += numberInThala.join(" + ") + " = " + sum + '\n'
        numberInThala = sum.toString().split('')
      }
      if (finalSum === 7) {
        isThala = true
      } else if(finalSum===0 && numberInThala.length===1) {
        finalSum = Number(numberInThala[0])
        if (finalSum===7){
          isThala = true
          reason = finalSum + " = 7"
        } else {
          reason = finalSum + " != 7"
        }
      }
    } else if (thalaValue.split('').includes('+') || thalaValue.split('').includes('-')) {
      // Received Expression from user

      if (eval(thalaValue) === 7) {
        reason = thalaValue + " = 7"
        isThala = true
      } else {
        reason = thalaValue + " = " + eval(thalaValue)
      }
    } else {
      var thalaValueInSplit = thalaValue.split('')
      if (thalaValueInSplit.includes(' ')) {
        // Received a sentence

        if (thalaValue.split(' ').length === 7) {
          reason = '"' + thalaValue + '"' + ' consist of 7 words'
          isThala = true
        } else {
          reason = '"' + thalaValue + '"' + ' consist of ' + thalaValue.split(' ').length + ' words'
        }
      } else if (thalaValueInSplit.length === 7) {
        // Received a word

        reason = thalaValueInSplit.join(' + ') + " = 7"
        isThala = true
      } else {
        // None of condition's match. NOT a THALA

        reason = thalaValueInSplit.join(' + ') + " = " + thalaValueInSplit.length
      }
    }

    return Response.json({ reason, isThala })
  } catch (error) {
    return Response.json({"error": 'Unknown Error: ' + error}, { status: 400 })
  }
}