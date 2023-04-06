import React, { createContext, useEffect, useState } from "react";
import { PersonService } from "../../services/PersonServices";
import { IPerson } from "../../interfaces/IPerson";

interface IPersonContext {
  people: IPerson[];
  editPerson: IPerson | null;
  createPerson: (person: IPerson) => void;
  deletePerson: (person: IPerson) => void;
  findPerson: (id: number) => void;
  updatePerson: (person: IPerson) => void;
  setEditPerson: React.Dispatch<React.SetStateAction<IPerson | null>>;
}
export const PersonContext = createContext<IPersonContext>({
  people: [],
  editPerson: null,
  createPerson: (person: IPerson) => {},
  deletePerson: (person: IPerson) => {},
  findPerson: (id: number) => {},
  updatePerson: (person: IPerson) => {},
  setEditPerson: () => {},
});

const PersonContextProvider = (props: any) => {
  const personService = new PersonService();

  const [people, setPerson] = useState<IPerson[]>([]);

  const [editPerson, setEditPerson] = useState<IPerson | null>(null);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPerson(data);
    });
  }, []);

  const createPerson = (person: any) => {
    personService.save(person).then((data) => {
      setPerson([...people, data]);
    });
  };

  const deletePerson = (id: any) => {
    personService
      .delete(id)
      .then(() => setPerson(people.filter((p) => p.id_persona !== id)));
    setEditPerson(null);
  };

  const findPerson = (id: number) => {
    const person = people.find((p) => p.id_persona === id);
    setEditPerson(person || null);
  };
  const updatePerson = (person: any) => {
    personService
      .update(person)
      .then((data) =>
        setPerson(
            people.map((e) => (e.id_persona === person.id_persona ? data : e))
        )
      );

    setEditPerson(null);
  };

  return (
    <PersonContext.Provider
      value={{
        createPerson,
        deletePerson,
        findPerson,
        updatePerson,
        editPerson,
        people,
        setEditPerson,
      }}
    >
      {props.children}
    </PersonContext.Provider>
  );
};
export default PersonContextProvider;
