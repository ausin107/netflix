import { useEffect, useRef } from 'react'

function LazyLoadingImg({ className, alt, imgSrc }) {
  const imgRef = useRef()
  useEffect(() => {
    const img = imgRef.current
    const imgClasses = img.getAttribute('lazy-src')
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute('src', imgClasses)
        img.removeAttribute('lazy-src')
      }
    })
    if (img) observer.observe(img)
  }, [])
  return <img className={className} lazy-src={imgSrc} alt={alt} ref={imgRef} />
}
export default LazyLoadingImg
