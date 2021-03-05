const sliderInit = () => {
    const $prevBtn = document.querySelector("#prev")
    const $nextBtn = document.querySelector("#next")
    const $slider = document.querySelector("#slider")
    const $slides = document.querySelectorAll("#slide")
    const slidesLen = $slides.length
    //для эффекта цикличности клонируем последний и первый слайд по краям слайдера
    $slider.insertAdjacentElement("beforeend", $slides[0].cloneNode(true))
    $slider.insertAdjacentElement("afterbegin",$slides[slidesLen - 1].cloneNode(true))
  
    let translateValue = 0
    const moveSlide = (vector) => {
      //if on last func call we added this class, we should remove it
      $slider.classList.remove("notransition")
  
      //to not clicking btn since animation not finished yet
      buttonsDisable()
      setTimeout(()=>{
          buttonsInit()
      }, 1000)
  
      vector === "next" ? (translateValue -= 100) : (translateValue += 100)
      $slider.style = `transform: translateX(${translateValue}%);`
  
      //if we on first or last elem
      if (translateValue === 0 || translateValue === (slidesLen + 1) * -100) {
          setTimeout(() => {
              $slider.classList.add("notransition")
              translateValue = translateValue === 0 ? slidesLen * -100 : -100
              $slider.style = `transform: translateX(${translateValue}%);`         
          }, 1000)
      }
    }
  
  
    moveSlide("next")
  
    function buttonsInit() {
      $prevBtn.onclick = () => moveSlide("prev")
      $nextBtn.onclick = () => moveSlide("next")
    }
    function buttonsDisable() {
      $prevBtn.onclick = () => null
      $nextBtn.onclick = () => null
    }
  
    buttonsInit()
  }
  
  sliderInit()