import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useReminders = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'reminders'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReminders(docs);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addReminder = async (reminderData) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'users', user.uid, 'reminders'), {
        ...reminderData,
        createdAt: serverTimestamp(),
        isActive: true
      });
      toast.success("Reminder added successfully!");
    } catch (error) {
      toast.error("Failed to add reminder.");
      console.error(error);
    }
  };

  const deleteReminder = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'reminders', id));
      toast.success("Reminder deleted.");
    } catch (error) {
      toast.error("Failed to delete reminder.");
    }
  };

  const toggleReminder = async (id, currentStatus) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'reminders', id), {
        isActive: !currentStatus
      });
    } catch (error) {
      toast.error("Failed to update reminder.");
    }
  };

  return { reminders, loading, addReminder, deleteReminder, toggleReminder };
};

export default useReminders;
