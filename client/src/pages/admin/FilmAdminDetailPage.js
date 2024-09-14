import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteFilmById, findFilmById } from "../../services/FilmService";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { APP_BASE_URL } from "../../config/constants";

const FilmAdminDetailPage = () => {
  const [film, setfilm] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();

  const [img, setImg] = useState();

  useEffect(() => {
    const loadfilm = async () => {
      try {
        const response = await findFilmById(id);
        const _film = response.data;
        setfilm(_film);
        if (_film.imageThumbnail) {
          fetchImage(_film.imageThumbnail);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadfilm();
    // eslint-disable-next-line
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchImage = async (gambar) => {
    const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });

    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  }

  const handleDelete = async () => {
    try {
      await deleteFilmById(id);
      navigate("/admin/film", {
        replace: true
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainPage>
      {loading ?
        <ProgressBar mode="indeterminate"
          className="my-progress-bar" /> :
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Detail Film {film.title}</h2>
                <div>
                  <Link to="/admin/film"
                    style={{ textDecoration: "none" }}>
                    <Button label="Kembali"
                      icon="pi pi-chevron-left"
                      className="mr-2" />
                  </Link>

                  <Link to={`/admin/film/edit/${film.id}`}
                    style={{ textDecoration: "none" }}>
                    <Button label="Edit"
                      icon="pi pi-pencil"
                      className="mr-2" />
                  </Link>

                  <Button label="Hapus"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => setDelDialog(true)}
                  />
                  
                </div>
              </div>
              <div className="content-body">
                <div className="content-detail shadow-1">
                  <div className="flex">
                    <div className="flex-grow-1">
                      <div className="grid">
                        <div className="col-fixed detail-label">Title Film</div>
                        <div className="col">{film.title}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Deskripsi</div>
                        <div className="col">{film.description}</div>
                      </div>
                    </div>
                    <div className="flex-none">
                      <div className="image-display-wrapper">
                        {
                          img ?
                          <img src={img}
                          alt="Gambar Film"
                          className="image-display" /> :
                          <i className="icon-display pi pi-image"></i>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ConfirmDialog visible={delDialog}
                onHide={() => setDelDialog(false)}
                message="Apakah anda yakin akan menghapus data ini?"
                header="Konfirmasi"
                icon="pi pi-exclamation-triangle"
                accept={handleDelete}
              />
            </div>
          </div>
        </div>
      }

    </MainPage>
  )
}

export default FilmAdminDetailPage;
