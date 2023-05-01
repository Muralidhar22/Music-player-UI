export const getBase64 = async(url)=>{
    try {
        // Fetch the image as a Blob
        const response = await fetch(url);
        const blob = await response.blob();
    
        // Create a new FileReader instance
        const reader = new FileReader();
    
        // Read the contents of the Blob as a data URL
        reader.readAsDataURL(blob);
    
        // Return a promise that resolves with the base64 encoded string
        return new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
          };
    
          reader.onerror = reject;
        });
      } catch (error) {
        console.log(error);
      } 
     }