export const settings = {
  sayWhoSaysSomething: false,
}

export function setSettingsToJustListening() {
  settings.sayWhoSaysSomething = true
}

export function setSettingsToListeningAndReading() {
  settings.sayWhoSaysSomething = false
}

let storyTellerVoice = null

export function setStoryTellerVoice(voice) {
  storyTellerVoice = voice
}

let $text = null

export function setTextOutputElement(element) {
  $text = element
}

export let voices = {}

export async function speakBase(text, voice) {
  return new Promise((resolve, onError) => {
    if (speechSynthesis.speaking) {
      onError(new Error('speechSynthesis.speaking'))
      return
    }

    const utterThis = new SpeechSynthesisUtterance(text)
    utterThis.voice = voice

    utterThis.onend = function (event) {
      resolve(undefined)
    }

    utterThis.onerror = function (event) {
      onError(event)
    }

    utterThis.pitch = 1
    utterThis.rate = 1
    speechSynthesis.speak(utterThis)
  })
}

export async function speak(text, voice = null) {
  if (!voice) {
    voice = storyTellerVoice
  }
  await speakBase(text, voice)
}

export async function waitForSpeechSynthesisToBeReady() {
  return new Promise(resolve => {
    speechSynthesis.addEventListener('voiceschanged', function () {
      resolve(undefined)
    })
  })
}
const someoneSaysSomethingRegExp = /^(.+): (.+)$/

// Signatures:
// text, [options]
// texts
export async function presentText(arg1, arg2) {
  let texts
  if (Array.isArray(arg1)) {
    texts = arg1
  } else {
    const entry = {
      text: arg1,
    }
    if (arg2) {
      Object.assign(entry, arg2)
    }
    texts = [entry]
  }

  texts = texts.map(entry =>
    typeof entry === 'string' ? { text: entry } : entry
  )

  let shownText = ''
  for (const entry of texts) {
    if (shownText.length > 0) {
      shownText += '\n'
    }
    shownText += entry.text
  }
  $text.textContent = shownText

  for (const entry of texts) {
    const match = someoneSaysSomethingRegExp.exec(entry.text)
    if (match) {
      await speak(match[1] + ': ')
      await speak(match[2], voices[entry.whoSaysIt || match[1]])
    } else {
      await speak(entry.text)
    }
  }
}
