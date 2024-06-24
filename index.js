import {
  presentText,
  voices,
  setStoryTellerVoice,
  waitForSpeechSynthesisToBeReady,
  setTextOutputElement,
} from './lib.js'

function initializeVoices() {
  const voices2 = speechSynthesis.getVoices()
  const voice1 = voices2.find(voice => voice.voiceURI === 'Google US English')
  const voice2 = voices2.find(
    voice => voice.voiceURI === 'Google UK English Female'
  )
  const voice3 = voices2.find(
    voice => voice.voiceURI === 'Google UK English Male'
  )
  setStoryTellerVoice(voice1)
  voices.Person = voice3
  voices.Waiter = voice3
}

const $text = document.querySelector('#text')

setTextOutputElement($text)

await waitForSpeechSynthesisToBeReady()
initializeVoices()

await presentText('Someone walks into a saloon.')
await presentText('Everyone stops speaking. Silence.')
await presentText('The person goes towards the bar.')
await presentText('Person: One glass of water please.')
await presentText('Waiter: Ok, one moment.')
await presentText(
  'The waiter grabs an empty glass and fills water from a bottle into it.'
)
await presentText('Waiter: Here you go.')
await presentText('Person: Thanks.')
await presentText('The other people in the saloon continue talking.')
await presentText(
  'The person who has ordered the glass of water starts drinking it.'
)
await presentText(
  'Shortly after he notices that he would like a slice of a citrus into it.'
)
await presentText('He asks the waiter: Can I have a slice of citrus please?', {
  whoSaysIt: 'Person',
})
await presentText("Waiter: Let's see if I find one.")
await presentText(
  'The waiter grabs a citrus, slices it into slices and hands one slice to the person.'
)
await presentText('Waiter: Here you go.')
await presentText('Person: Thanks.')
await presentText(
  'The person continues drinking his water, now with a mild taste of citrus.'
)
