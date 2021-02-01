
  const dummy = (blogs) => {
    const valeur1 = (sum, item) => {
      return sum + item
    }
  
    return blogs.length === 0
           ? 0
           : blogs.reduce(valeur1, 0) / blogs.length
  }

  const totalLikes = (blogs) => {
    const total = (sum, likes) =>{
      return sum + likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(total, 0) / blogs.length
} 

const favoriteblog = (blogs) => {
  let plusGrand =0
  blogs.forEach(element => {
    if(element >= plusGrand ){
      plusGrand  = element
    } 
  });
  console.log('mesage',blogs) 
  console.log('avorie',plusGrand)
  /*const findlike = blogs.find(like => like >= like)
  
  */
 return plusGrand //findlike
 
 /* blogs === 0
    ? 0
    : blogs.find(value => value >= value)*/
  } 
  

  module.exports = {
    dummy,
    totalLikes,
    favoriteblog,
    
  }