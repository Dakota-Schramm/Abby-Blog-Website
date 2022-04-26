import React, {useState} from "react";

export default function PageIndexer ({currentPage, posts}) {
  const MAX_PAGE = Math.floor(posts.length / 8);
  
  function FirstButton () {
    const INACTIVE = currentPage === 0 
    let buttonStyle = "blog-index-btn";
    if (INACTIVE) buttonStyle += " blog-index-not-active" 
      return (
        <button href={!INACTIVE ? "#" : null} className={buttonStyle} 
          onClick={() => {
            setCurrentPage(0)
            if (!INACTIVE) window.scrollTo(0, 0) 
          }} 
        >
          {`<<`}
        </button>
      )
  }
        
        
  function LeftButton () {
    const INACTIVE = currentPage === 0 
        
    let buttonStyle = "blog-index-btn";
    if (INACTIVE) buttonStyle += " blog-index-not-active" 
      return (
        <button href={!INACTIVE ? "#" : null}
          className={buttonStyle} 
          onClick={() => {
              setCurrentPage(currentPage > 0 
              ? currentPage - 1 
              : 0
              )
              if (!INACTIVE) window.scrollTo(0, 0) 
          }}
        >
          {`<`}
        </button>
      )
  }
        
  function RightButton () {
    const INACTIVE = currentPage === MAX_PAGE;
        
    let buttonStyle = "blog-index-btn";
    if (INACTIVE) buttonStyle += " blog-index-not-active" 
        
    return (
      <button href={!INACTIVE ? "#" : null} className={buttonStyle} 
        onClick={() => {
          setCurrentPage(currentPage < MAX_PAGE 
            ? currentPage + 1 
            : MAX_PAGE 
          ) 
          if (!INACTIVE) window.scrollTo(0, 0) 
        }}
      >
        {`>`}
      </button>
    )
  }
        
  function LastButton () {
    const INACTIVE = currentPage === MAX_PAGE;
        
    let buttonStyle = "blog-index-btn";
    if (INACTIVE) buttonStyle += " blog-index-not-active" 
        
    return (
      <button href={!INACTIVE ? "#" : null} 
          className={buttonStyle} 
          onClick={() => {
            setCurrentPage(MAX_PAGE)
            if (!INACTIVE) window.scrollTo(0, 0) 
          }}
      >
        {`>>`}
      </button>
    )
  }
        
  return (
    <section className="blog-index"> 
      <FirstButton />
      <LeftButton />
      <div className="blog-index-btn blog-index-num">{currentPage + 1}</div>
      <RightButton />
      <LastButton />
    </section>
  )
}