import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { APP_BASE_URL } from "../../config/constants";
import { createFilm } from "../../services/FilmService";

const FilmAdminCreatePage = () => {
  const [films, setFilms] = useState();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const [img, setImg] = useState();

  useEffect(() => {

    const emptyFilm = {
      id: null,
      title: "",
      imageThumbnail: "",
      description: "",
    };
    setFilms(emptyFilm);
    setLoading(false);
  }, []);

  const saveFilm = async () => {
    try {
      setSubmitted(true);
      const response = await createFilm(films);
      const _product = response.data;
      navigate(`/admin/film/detail/${_product.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const onUpload = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setImg(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _films = films;
    _films.imageThumbnail = response.fileName;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const onBeforeSend = (event) => {
    if (user && user.token) {
      event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
    }
  }

  return (
    <MainPage>
      {loading ?
        <ProgressBar mode="indeterminate" className="my-progress-bar" />
        :
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Tambah Film</h2>
              </div>
              <div className="content-body">
                <div className="content-form shadow-1">

                  <div className="flex">
                    <div className="flex-grow-1">
                      <div className="p-fluid mb-4">
                        <div className="p-field mb-3">
                          <label htmlFor="nama" className="form-label">
                            Title
                          </label>
                          <InputText
                            value={films.title}
                            placeholder="Ketik title film"
                            id="title"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _film = { ...films };
                              _film.title = val;
                              setFilms(_film);
                            }}
                          />
                          {submitted && !films.title && (
                            <span className="p-error">
                            Title tidak boleh kosong
                            </span>
                          )}
                        </div>

                        <div className="p-field mb-3">
                          <label htmlFor="deskripsi" className="form-label">
                            Deskripsi
                          </label>
                          <InputText
                            value={films.description}
                            placeholder="Ketik deskripsi film"
                            id="description"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _film = { ...films };
                              _film.description = val;
                              setFilms(_film);
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
                    <div className="flex-none ml-6 mt-4"
                    style={{ textAlign: "center" }}>
                      <div className="image-display-wrapper">
                          {
                            img ?
                            <img src={img}
                            alt="Gambar Film"
                            className="image-display"
                            /> :
                            <i className="icon-display pi pi-image"></i>
                          }
                      </div>
                      <FileUpload
                      name="file"
                      url={`${APP_BASE_URL}/api/uploadImage`}
                      auto
                      accept="image/*"
                      onUpload={onUpload}
                      onBeforeSend={onBeforeSend}
                      chooseLabel="Pilih Gambar"
                      mode="basic" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </MainPage>
  )
}

export default FilmAdminCreatePage;
