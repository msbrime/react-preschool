import React from 'react'

const QuestionLoader = ({src, onLoad}) => {
  return (
        <>
        <div className="card__media loader">
          <img src={src} onLoad={onLoad} style={{ display: "none" }} />
        </div>
        <div className="card__body loader">
          <svg width="100%" height={50} preserveAspectRatio="none" viewBox="0 0 1000 100">
            <path d="M0,0 h1000 v100 h-1000 v-100
                    M50,20 a7.5 7.5 0 0 0 0 15 h345 a7.5 7.5 0 0 0 0 -15 h-345z
                    M435,20 a7.5 7.5 0 0 0 0 15 h260 a7.5 7.5 0 0 0 0 -15 h-260z
                    M735,20 a7.5 7.5 0 0 0 0 15 h215 a7.5 7.5 0 0 0 0 -15 h-215z
                    M50,55 a7.5 7.5 0 0 0 0 15 h95 a7.5 7.5 0 0 0 0 -15 h-95z
                    M185,55 a7.5 7.5 0 0 0 0 15 h300 a7.5 7.5 0 0 0 0 -15 h-300z
                    M525,55 a7.5 7.5 0 0 0 0 15 h260 a7.5 7.5 0 0 0 0 -15 h-260z"
            stroke="transparent" fill="#007A70" />
          </svg>
        </div>
        </>
  )
}

export default QuestionLoader
