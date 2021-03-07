function sliderInit() {
  const $sliderView = document.querySelector(".slider-view")
  const $prevBtn = $sliderView.querySelector("#prev")
  const $nextBtn = $sliderView.querySelector("#next")
  const $slider = $sliderView.querySelector("#slider")
  const $slides = $slider.querySelectorAll("#slide")
  const slidesLen = $slides.length
  const SLIDE_TRANSITION_TIME = 1000

  let currentSlide = 0
  let $indicators = []
  let interval

  init()
  function init() {
    //for the cyclical effect, clone the last and first slide along the edges of the slider
    $slider.insertAdjacentElement("beforeend", $slides[0].cloneNode(true))
    $slider.insertAdjacentElement("afterbegin", $slides[slidesLen - 1].cloneNode(true))

    indicatorsInit()
    buttonsInit()
    //to compensate for the added slide at the beginning, move the slider one step forward
    moveSlide(currentSlide + 1)
  }

  function moveSlide(slideId) {
    stopInterval()
    //if on last func call we added this class, we should remove it
    $slider.classList.remove("notransition")

    //to not clicking btn since animation not finished yet
    buttonsDisable()
    setTimeout(() => {
      buttonsEnable()
    }, SLIDE_TRANSITION_TIME)

    currentSlide = slideId
    $slider.style = `transform: translateX(${currentSlide * -100}%);`

    //if the current slide is one of the cloned slides along the edges of the slider
    // when the transition is complete, the slider will unnoticeably jump to the original of the current cloned slide
    if (currentSlide === 0 || currentSlide === slidesLen + 1) {
      currentSlide = currentSlide === 0 ? slidesLen : 1
      setTimeout(() => {
        $slider.classList.add("notransition")
        $slider.style = `transform: translateX(${currentSlide * -100}%);`
      }, SLIDE_TRANSITION_TIME)
    }
    setCurrentIndicator()
    startInterval()
  }
  function startInterval(ms = 4000) {
    interval = setInterval(() => {
      moveSlide(currentSlide + 1)
    }, ms)
  }
  function stopInterval() {
    clearInterval(interval)
  }
  function buttonsInit() {
    $prevBtn.onclick = () => moveSlide(currentSlide - 1)
    $nextBtn.onclick = () => moveSlide(currentSlide + 1)
  }
  function buttonsDisable() {
    $prevBtn.disabled = $nextBtn.disabled = true
  }
  function buttonsEnable() {
    $prevBtn.disabled = $nextBtn.disabled = false
  }
  function indicatorsInit() {
    let items = ""
    for (let i = 0; i < slidesLen; i++) {
      items += '<li class="indicator"></li>'
    }
    $slider.insertAdjacentHTML(
      "afterend",
      `<ul class='indicators'>${items}</ul>`
    )
    $indicators = $sliderView.querySelectorAll(".indicator")
    $indicators.forEach(
      ($indicator, index) => ($indicator.onclick = () => moveSlide(index + 1))
    )
  }
  function setCurrentIndicator() {
    $indicators.forEach(($indicator) => $indicator.classList.remove("active"))
    if ($indicators[currentSlide - 1]) {
      $indicators[currentSlide - 1].classList.add("active")
    }
  }
}

sliderInit()
