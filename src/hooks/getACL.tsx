import axios from "axios";
import {useState} from "react";
interface DataFromServerInterface {
    data: {},
    acl: {}
}
export function useGetACL () {
    const [acl, setAcl] = useState({});

    async function fetchACL(){
      try {
          const response=await axios.get<DataFromServerInterface>('/acl')
          setAcl(response.data.acl)
      }
      catch (e){

      }
  }
}
