import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import photos from '../../styles/Carousel.module.css';
import writing from '../../styles/Writing.module.css';
import Image from 'next/image';
import { DotButton, useDotButton } from './dots.js'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './arrows.js'
import imageByIndex from "./images";
import writingByIndex from "./writing";
import Autoplay from 'embla-carousel-autoplay'


const Carousel = (props) => {
  const { slides, options, id } = props
  const styles = id === 'writing' ? writing : photos

  const handleIndex = (index) => {
    if (id === 'writing') {
      return writingByIndex(index)
    } else {
      return imageByIndex(index)
    }

  } 

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ])

  const [isPlaying, setIsPlaying] = useState(false)

  const onButtonAutoplayClick = useCallback(
    (callback) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop

      resetOrStop()
      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    emblaApi
      .on('autoplay:play', () => setIsPlaying(true))
      .on('autoplay:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(false))
  }, [emblaApi])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)


  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const handlePrev = () => {
    onButtonAutoplayClick(onPrevButtonClick)
  }
  const handleNext = () => {
    onButtonAutoplayClick(onNextButtonClick)
  }
  const handleDot = (index) => {
    onDotButtonClick(index)
  }

  return (
    <>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {slides.map((index) => (
              <div className={styles.embla__slide} key={index}>
                <Image
                  src={handleIndex(index)}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className={styles.embla__slide__img}
                  alt="cover image"
                  placeholder="blur"
                  blurDataURL={handleIndex(index)}
                  loading = "eager"
                />
              </div>
            ))}
          </div>
        </div>
      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={handlePrev} disabled={prevBtnDisabled} />
          <NextButton onClick={handleNext} disabled={nextBtnDisabled} />
        </div>

        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => handleDot(index)}
              className={`${styles.embla__dot} ${index === selectedIndex ? styles.embla__dot__selected : ''}`}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default Carousel