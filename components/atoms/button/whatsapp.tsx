import React from 'react'

export const Whatsapp = ({message}:any) => {
    const phoneNumber = '8217667507'; // Replace with the phone number you want to send a message to
    // const message = 'Hello, how are you?'; // Replace with the message you want to send
  
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
    return (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="text-md text-black px-3 py-2 bg-orangeBg rounded-lg" >Send WhatsApp Message</button>
        </a>
     
    );
}
