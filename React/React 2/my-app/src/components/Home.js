import React from 'react';
import { PageContainer,DogList,DogItem,DogForm,Input,Button, Buttons, TabButton, ShelterForm } from './HomeStyle';
import dogs from '../dogsData';
import { useState, useEffect, useRef } from 'react';

const Home = () => {

    const dogsCount=useRef(dogs.length);
    const [listOfDogs,setListOfDogs] = useState(dogs);
    const [newDog,setNewDog] = useState({
     //   id:listOfDogs.length>0?Math.max(...listOfDogs.map(dog=>dog.id))+1:1,
        id:dogsCount.current+1,
        name:"",
        race:"",
        age:"",
    });
    const [valid,setValid]=useState(false);
    const [activeTab, setActiveTab]=useState("list-of-dogs");
    const [shelterStorage, setShelterStorage]=useState({
        food:35,
        vaccine: 125,
        pills:20,
    });

    const[tempStorage,setTempStorage]=useState({
        food: "",
        vaccine: "",
        pills: "",
    });

    const handleChange=(e)=>{
        const updateDog={...newDog,[e.target.name]:e.target.value};
        setNewDog(updateDog);
        validateData(updateDog);
    }

    const dogsRequirements = {
        food: 5,
        vaccine: 1,
        pills: 2
    };
    //useEffect(()=>{console.log(newDog)},[newDog]);

    const validateData=(dog)=>{
        if (dog.age===""|| parseInt(dog.age)<0|| parseInt(dog.age)>24) {
            return setValid(false);
        }else if (dog.name.trim().length===0) {
            return setValid(false);
        }
        else if (dog.race.trim().length===0) {
            return setValid(false);
        }
        setValid(true);
    };
    const handleAdd=()=>{
        let pushDog=false;
        const totalRequirements={
            food:(dogsRequirements.food*(listOfDogs.length+1)),
            vaccine:(dogsRequirements.vaccine*(listOfDogs.length+1)),
            pills:(dogsRequirements.pills*(listOfDogs.length+1)),
        }
        if (totalRequirements.food<= shelterStorage.food && totalRequirements.vaccine<= shelterStorage.vaccine &&totalRequirements.pills<= shelterStorage.pills) {
            pushDog=true;
        }
        if (pushDog) {
            setListOfDogs((listOfDogs)=>{
                return[...listOfDogs,newDog];
            });
          //  const newId=newDog.id+1;
            dogsCount.current++;
            const updateDog={
              //  id:newId,
                id:dogsCount.current+1,
                name:"",
                race:"",
                age:"",
            }
            setNewDog(updateDog);
            setValid(false);
        }
        else{
            alert("Nedostatek zasob pro pridani psa.")
        }
       
    }

    const handleDelete=(idToDel)=>{
        setListOfDogs(listOfDogs.filter(dog=>dog.id!=idToDel));
    }

    const handleStorage=(e)=>{
        const updateStorage={...tempStorage,[e.target.name]:e.target.value};
        setTempStorage(updateStorage);
    }

    const updateStorage=()=>{
        const storageValue=tempStorage;
        let newStorageValue={};
        const keys=Object.keys(storageValue);
        keys.map((key)=>{
        if (parseInt(storageValue[key])) {
            newStorageValue[key]=parseInt(shelterStorage[key])+parseInt(storageValue[key])
        } else{
            newStorageValue[key]=parseInt(shelterStorage[key])
        }
    })
    setShelterStorage(newStorageValue);
    setTempStorage({food:"",vaccine:"",pills:""});
}

  return (
    <PageContainer>
        <Buttons>
            <TabButton name='list-of-dogs' data-active={activeTab} onClick={()=>{setActiveTab("list-of-dogs")}}>
                Seznam psů
            </TabButton>
            <TabButton name='shelter-storage' data-active={activeTab} onClick={()=>{setActiveTab("shelter-storage")}}>
                Sklad útulku
            </TabButton>
        </Buttons>
        {(activeTab==="list-of-dogs")&&
            <>
            <DogList name='dogList'>
            {listOfDogs.map((dog)=> {
                return(
                    <DogItem key={dog.id}>{dog.name}/{dog.race}/{dog.age}
                    <Button style={{
                        color:'#64766a',
                        fontWeight:"bolder",
                        border:2+"px solid #64766a",
                        borderRadius:50 +"%",
                        height:25 +"px",
                        width:25+"px",
                    }}
                    onClick={() => {handleDelete(dog.id)}}>
                        X
                    </Button>
                    </DogItem>
                )
            })}
        </DogList>
            <DogForm>
                <Input type='text' placeholder='jmeno psa' name='name' value={newDog.name} onChange={handleChange}/>
                <Input type='text' placeholder='rasa psa' name='race' value={newDog.race} onChange={handleChange}/>
                <Input type='number' placeholder='vek psa' name='age' min="0" max="24" value={newDog.age} onChange={handleChange}/>
                <Button disabled={!valid} onClick={handleAdd}>Pridat</Button>
            </DogForm>
            </>
        }
        {(activeTab==="shelter-storage")&&
            <>
            <h3>Aktualni zasoby</h3>
            <p>granule: {shelterStorage.food} kg</p>
            <p>vakciny: {shelterStorage.vaccine} ks</p>
            <p>medikamenty: {shelterStorage.pills} ks</p>
            <ShelterForm>
            <Input type='number' min="0" placeholder='granule (kg)' name='food' value={tempStorage.food} onChange={handleStorage}/>
            <Input type='number' min="0" placeholder='vakciny (ks)' name='vaccine' value={tempStorage.vaccine} onChange={handleStorage}/>
            <Input type='number' min="0" placeholder='léky (ks)' name='pills' value={tempStorage.pills} onChange={handleStorage}/>
            <Button onClick={updateStorage}>Doplnit zásoby</Button>
            </ShelterForm>
            </> 
        }
    </PageContainer>
  )
}

export default Home

