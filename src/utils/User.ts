import secureLocalStorage from "react-secure-storage"
import {jwtDecode} from "jwt-decode";

// export const getUserFromJWT = () => {
//     const token:any = secureLocalStorage.getItem('token')
//     if (token) {
//         const decoded:any = jwtDecode(token);
//         console.log('decode',decoded)
//         const user = decoded?.payload
//         return user;
//     }
//     return null
// }


export const getUserFromToken = () => {
    const token:any = secureLocalStorage.getItem("token"); // Récupère le token stocké
    if (!token) return null; // Vérifie si le token est présent
  
    try {
      const decodedToken: any = jwtDecode(token); // Décode le token
      return decodedToken.id; // Retourne l'ID
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      return null;
    }
  };


