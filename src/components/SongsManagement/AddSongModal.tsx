import styles from "./AddSongModal.module.css";

import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

import { REST_BASE_URL } from "../../constants/constants";

const AddSongModal = ({
  isModalOpen,
  setIsModalOpen,
  fetchSongs,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchSongs: () => Promise<void>;
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const refreshButton = () => {
    if (titleRef.current && fileRef.current) {
      setDisabled(
        titleRef.current.value === "" || fileRef.current.files!.length === 0
      );
    }
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Prepare request body
    let data = new FormData();
    data.append("file", fileRef.current!.files![0]);
    data.append("title", titleRef.current!.value);

    // Send POST request
    const response = await fetch(`${REST_BASE_URL}/song`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token") ?? "",
      },
      body: data,
    });

    if (response.ok) {
      toast.success("Song successfully added!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await fetchSongs();

      // Empty input
      titleRef.current!.value = "";
      fileRef.current!.value = "";
    } else {
      const data = await response.json();
      toast.error(data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      style={
        !isModalOpen
          ? {
              transform: "scale(0)",
            }
          : {}
      }
    >
      <div className={styles.modalContainer}>
        <h1>Add new song</h1>
        <form
          className={styles.addSongForm}
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div className={styles.formGroup}>
            <label htmlFor="title">Song title</label>
            <input
              type="text"
              placeholder="Fukashigi no Carte"
              ref={titleRef}
              onChange={() => refreshButton()}
            />
          </div>
          <input
            type="file"
            name="file"
            id="file"
            ref={fileRef}
            onChange={() => refreshButton()}
            accept=".mp3"
          />
          <div className={styles.formButtons}>
            <button
              type="submit"
              onClick={() => setIsModalOpen(false)}
              disabled={disabled}
            >
              Add song
            </button>
            <button
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;
