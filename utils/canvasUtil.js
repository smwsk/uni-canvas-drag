function countTextLength(text, canvas)   
{  
    var font = canvas.font;  
    var fontSize = 12;  
    var pos=font.search('px');  
    if (pos>0)   
    {  
        var strSize = font.substring(0,pos);  
        fontSize = parseInt(strSize);  
    }  
    text = String(text);  
    var text = text.split('');  
    var width = 0;  
    for (let i = 0; i < text.length; i++)   
    {  
        let item = text[i];  
        if (/[a-zA-Z]/.test(item))   
        {  
            width += 7;  
        } else if (/[0-9]/.test(item))   
        {  
            width += 5.5;  
        } else if (/\./.test(item))   
        {  
            width += 2.7;  
        } else if (/-/.test(item))   
        {  
            width += 3.25;  
        } else if (/[\u4e00-\u9fa5]/.test(item))   
        {  
            width += 10;  
        } else if (/\(|\)/.test(item))   
        {  
            width += 3.73;  
        } else if (/\s/.test(item))   
        {  
            width += 2.5;  
        } else if (/%/.test(item))   
        {  
            width += 8;  
        } else   
        {  
            width += 10;  
        }  
    }  
    return width * fontSize / 10;  
}

export { countTextLength }