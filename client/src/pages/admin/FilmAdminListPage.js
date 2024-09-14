// FilmAdminListPage.js
import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { findAllFilm } from "../../services/FilmService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const FilmAdminListPage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await findAllFilm();
        setFilms(response); 
      } catch (error) {
        console.error("Error loading films:", error);
      }
    };

    load();
  }, []);

  const namaBodyTemplate = (row) => {
    return (
      <Link to={`/admin/film/detail/${row.id}`} className="cell-link">
        {row.title} 
      </Link>
    );
  };

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Film</h2>
              <div>
                <Link to="/admin/film/create" style={{ textDecoration: "none" }}>
                  <Button label="Tambah" icon="pi pi-plus" />
                </Link>
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable value={films} size="small" stripedRows className="table-view">
                  <Column field="title" header="Nama Film" body={namaBodyTemplate} style={{ minWidth: '150px', padding: '0.5rem', textAlign: 'left' }}/>
                  <Column field="description" header="Deskripsi Film"  style={{ minWidth: '150px', padding: '0.5rem', textAlign: 'left' }}/>
                  <Column field="imageThumbnail" header="Image Thumbnail"style={{ minWidth: '150px', padding: '0.5rem', textAlign: 'left' }} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default FilmAdminListPage;
