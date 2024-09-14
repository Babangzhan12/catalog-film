import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { useNavigate, useParams } from "react-router-dom";
import { findFilmById, updateFilm } from "../../services/FilmService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { APP_BASE_URL } from "../../config/constants";
import { FileUpload } from "primereact/fileupload";

const FilmAdminEditPage = () => {
  const [films, setfilms] = useState({
    imageThumbnail: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const [img, setImg] = useState();

  const { id } = useParams();

  useEffect(() => {

    const loadFilm = async () => {
      try {
        const response = await findFilmById(id);
        const _film = response.data;
        setfilms(_film);
        if (_film.imageThumbnail) {
          fetchImage(_film.imageThumbnail);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadFilm();
    // eslint-disable-next-line
  }, [id]);

  const saveFilm = async () => {
    try {
      setSubmitted(true);
      const response = await updateFilm(films);
      const _film = response.data;
      navigate(`/admin/film/detail/${_film.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchImage = async (gambar) => {
    try {
        const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
      
          if (!res.ok) {
              throw new Error('Failed to fetch image');
            }
      
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg(imageObjectURL);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
  };

  const onUpload = async (event) => {
    const [file] = event.files;
    console.log('File to upload:', file);
    const imageObjectURL = URL.createObjectURL(file);
    setImg(imageObjectURL);
    try {
        const response = JSON.parse(event.xhr.response);
        console.log('Upload response:', response);
        setfilms(prevFilms => ({
          ...prevFilms,
          imageThumbnail: response.fileName
        }));
      } catch (error) {
        console.error('Error processing upload response:', error);
      }
    // const response = JSON.parse(event.xhr.response);
    // const _films = films;
    // _films.imageThumbnail = response.fileName;
  };

  const onBeforeSend = (event) => {
    if (user && user.token) {
      event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
    }
  };

  return (
    <MainPage>
      {loading ? (
        <ProgressBar mode="indeterminate" className="my-progress-bar" />
      ) : (
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Edit Film</h2>
              </div>
              <div className="content-body">
                <div className="content-form shadow-1">
                  <div className="flex">
                    <div className="flex-grow-1">
                      <div className="p-fluid mb-4">
                        <div className="p-field mb-3">
                          <label htmlFor="title" className="form-label">
                            Nama
                          </label>
                          <InputText
                            value={films.title}
                            placeholder="Ketik title Film"
                            id="title"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _film = { ...films };
                              _film.title = val;
                              setfilms(_film);
                            }}
                          />
                          {submitted && !films.title && (
                            <span className="p-error">
                              Titile film tidak boleh kosong
                            </span>
                          )}
                        </div>

                        <div className="p-field mb-3">
                          <label htmlFor="deskripsi" className="form-label">
                            Deskripsi
                          </label>
                          <InputText
                            value={films.description}
                            placeholder="Ketik deskripsi Film"
                            id="description"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _film = { ...films };
                              _film.description = val;
                              setfilms(_film);
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <Button
                          label="Simpan"
                          icon="pi pi-check"
                          onClick={saveFilm}
                        />
                      </div>
                    </div>
                    <div
                      className="flex-none ml-6 mt-4"
                      style={{ textAlign: "center" }}
                    >
                      <div className="image-display-wrapper">
                        {img ? (
                          <img
                            src={img}
                            alt="imageThumbnail Film"
                            className="image-display"
                          />
                        ) : (
                          <i className="icon-display pi pi-image"></i>
                        )}
                      </div>
                      <FileUpload
                        name="file"
                        url={`${APP_BASE_URL}/api/uploadImage`}
                        auto
                        accept="image/*"
                        onUpload={onUpload}
                        onBeforeSend={onBeforeSend}
                        chooseLabel="Pilih imageThumbnail"
                        mode="basic"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainPage>
  );
};

export default FilmAdminEditPage;
