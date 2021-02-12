const cutWord = (word: string, size: number) => {
    word = word.toString()
    if(word.length >= size){
        let croppedWord = word.substr(0, (size - 3))
        let concatenatedWord = croppedWord.concat('...')
        return concatenatedWord
    }
    return word;
}

export default cutWord;