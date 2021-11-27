<!-- <script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/posts.json`);
    const posts = await res.json();
    
    return {
      props: {
        posts,
      },
    };
  }
</script>

<script>
  import { seo } from "$lib/store";
  //https://www.npmjs.com/package/svelte-paginate

  export let posts;

  let items = posts;
  console.log(items)

  $seo = {
    title: "Hagura - Light",
    description: "Hagura is a light-weight theme/template built for sveltekit.",
  };
</script>

<main>
  <article>
    <h1 class="text-7xl leading-relaxed font-black font-display mb-4">
      Hello!
    </h1>
    <div>
      {#each items as { metadata: { title, description, tags, outline, slug }, path }}
        <div class="mb-4">
          <a sveltekit:prefetch href={path.replace(/\.[^/.]+$/, "")}
            ><h2 class="text-3xl leading-relaxed">{title}</h2></a
          >
          <p>{description}</p>
        </div>
      {/each}
    </div>
  </article>
</main>
 -->



<!-- TODO: Head -->

<svelte:window on:resize={() => {
  updateHandRotation()
  updateWaveTransformOrigin()
}}/>

<script>
  import { onMount } from 'svelte'
  import { seo } from "$lib/store";
  import PageLayout from '$lib/PageLayout.svelte'

  $seo = {
    title: "Matt Brealey",
    description: "some description",
  };

  //Setup the data types for the rotating text + store the current index
  let dataTypes = ["VFX", "design", "space"]
  let dataTypeIndex = 0

  //Store the rotation of the pointing hand
  let handRotation = 0
  let handElement = null
  let projectsElement = null
  let menuButton = null

  //Store the min/max wave angle, and store the current wave amount
  // let waveTransformOriginDesktop = [24, 22]
  let waveElement = null;
  let waveTransformOrigin = ['center', 'center']
  let waveMinAngle = 0
  let waveMaxAngle = 80
  let waveAmount = waveMinAngle
  let waveDuration = 0.3 // the time in seconds it takes to wave in a single direction
  let waveRepeat = 2 // this number of waves in a wave group
  let waveGroupDelay = 8 // the delay in second between wave groups

  function wavingWithDelay() {
    //Calculate the time in s it takes to complete a wave group
    const waveGroupDuration = waveDuration * 2 * waveRepeat

    //Repeat the wave group with the correct delay and return the interval so it can be cleaned up
    return setInterval(() => {
      waveGroup()
    }, waveGroupDuration + waveGroupDelay * 1000)
  }

  function waveGroup() {

    //Keep track of how many waves we've already done
    let waveCount = 0

    //Repeat a single wave...
    const waveGroup = setInterval(() => {
      singleWave()

      //Increase the waveCount
      waveCount += 1

      //If we've completed the right number of waves, stop waving
      if (waveCount === waveRepeat) { clearInterval(waveGroup) }
    }, waveDuration * 2 * 1000) 
  }

  function singleWave() {
    //Set the wave amount to max
    waveAmount = waveMaxAngle

    //Start a time out that will reset the wave amount
    setTimeout(() => { waveAmount = waveMinAngle }, waveDuration * 1000)
  }

  function updateWaveTransformOrigin() {
    //Get out if wave element wasn't found
    if (!waveElement) return;

    //Get the rect
    let handRect = waveElement.getBoundingClientRect()
    
    //Set the wave transform origin based upon rect
    waveTransformOrigin = [
      handRect.width * 0.77,
      handRect.height * 0.85
    ]
  }

  function updateHandRotation() {
    //Get out if either element doesn't exist
    if (!handElement || !projectsElement) return

    //Get the rects
    let handRect = handElement.getBoundingClientRect()
    let projectsRect = projectsElement.getBoundingClientRect()
    let menuRect = menuButton.getBoundingClientRect()
    
    //Get the positions
    let handPos = {x: handRect.x + (handRect.width/2), y: handRect.y + (handRect.height/2)}
    let projectsPos = {x: projectsRect.x + (projectsRect.width/2), y: projectsRect.y + (projectsRect.height/2)}
    let menuPos = {x: menuRect.x + (menuRect.width/2), y: menuRect.y + (menuRect.height/2)}

    //We need to use the menu if it's visible, otherwise the projects menu item
    //Quick way to do this is just to see if the rect's width/height are 0
    let pointingAt = menuPos
    if (menuRect.width === 0 && menuRect.height === 0) { pointingAt = projectsPos }

    //Get the angle between the points
    handRotation = (Math.atan2(pointingAt.y - handPos.y, pointingAt.x - handPos.x) * 180 / Math.PI) + 90
  }

  //On mount, start the rotation + return a cleanup function
  onMount(async () => {
    //Setup the text update timer
    const textUpdateTimer = setInterval(() => {
      dataTypeIndex = dataTypeIndex == (dataTypes.length - 1) ? 0 : dataTypeIndex + 1;
    }, 1500)

    //Setup the hand waving, and store the interval
    waveElement = document.getElementById("wavingHand")  
    const waveInterval = wavingWithDelay()

    //Store the hand/projects menu elements
    handElement = document.getElementById("pointingHand");
    projectsElement = document.getElementById("projectsMenuItem");
    menuButton = document.getElementById("menuButton");

    //Initialise the hand rotation
    updateHandRotation()

    //Initialise the hand wave transform origin
    updateWaveTransformOrigin()

    return () => {
      //Clear the text update timer on unmount
      clearInterval(textUpdateTimer);

      //Clear the waving timer on unmount
      clearInterval(waveInterval);
    }
  })

</script>

<PageLayout>
  <span slot="title">
    Hello
    <span 
      id="wavingHand"
      style="display:inline-block; transform:rotate({waveAmount}deg); transform-origin: {waveTransformOrigin[0]}px {waveTransformOrigin[1]}px; transition: transform {waveDuration}s ease-in-out;"
    >👋</span>
  </span>

  <span slot = "content">
    <p class="pb-4 sm:hidden">I'm Matt.</p>
    <p>
      <span class="hidden sm:inline-block">I'm Matt.</span> And I can help you do
      <span class="font-semibold">awesome</span>
      things with your
      <span class="font-semibold text-pink-600">{dataTypes[dataTypeIndex]}</span>
      data.
    </p>
    <p class="pt-4">
      I love making data flow between applications in occasionally odd but incredibly useful ways. Increasing the accessibility of otherwise esoteric datasets is a big part of my work, with my main focus being on image and 3D data.
    </p>
    <p class="pt-4">
      You can check out some of my personal projects, or read some of my
      <span class="text-gray-700 italic">(hopefully soon-to-be numerous)</span>
      short articles by clicking the links
      <span class="hidden sm:inline-block">
        up the top over there
      </span>
      <span class="sm:hidden">in the dropdown menu up there</span>
      <span id="pointingHand" style="display:inline-block; transform:rotate({handRotation}deg);">
          👆
        </span>
    </p>
    <p class="pt-4">
      Or if you have a specific project in mind,
      <a class="font-semibold colorLink" href="mailto:hello@mattbrealey.com">why not say hello?</a>
    </p>
  </span>
</PageLayout>