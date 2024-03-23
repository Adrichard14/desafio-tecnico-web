import { useState } from 'react';
import filterIcon from '../assets/filter.svg';

interface Regions {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

interface SearchbarProps {
  fetchMovies: (filters: string, page: number) => Promise<void>;
  regions: Regions[];
  page: number;
  setPage: (number: number) => void;
  setFilters: (str: string) => void
}

const SearchBar = ({ fetchMovies, regions, page, setPage, setFilters }: SearchbarProps) => {
  const [filterToggled, setFilterToggled] = useState<boolean>(false);
  const [formData, setFormData] = useState({ year: "", query: "", include_adult: "", region: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const buildFilterStr = (formData: any) => {
    let result = "";
    let firstValidItem = true;
    Object.keys(formData).forEach((i) => {
      if (i && formData[i]) {
        result += `${firstValidItem ? '?' : '&'}${i}=${formData[i]}`;
        firstValidItem = false;
      }
    });
    return result;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filters = buildFilterStr(formData);
    setFilters(filters);
    if (filters) {
      setPage(1);
    } else {
      setPage(0);
    }
    console.log(page);
    fetchMovies(filters, 1);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-center pt-5">
        <div className="col-md-6 col-xs-12 d-flex align-items-center">
          <div className="search-input-containter d-flex">
            <input type="submit" hidden />
            <input name="query" placeholder="Pesquise por filmes" value={formData.query} onChange={handleChange} className="search-input" />
          </div>
          <div className="filter-button-container">
            <button className="filter-button" type="button" onClick={() => setFilterToggled(!filterToggled)}>
              <img src={filterIcon} alt="Ativar filtros" />
            </button>
          </div>
        </div>
        <div className="col-12">
          {filterToggled && (
            <div className="filters mt-5">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 d-flex justify-content-center align-items-center row-filter">
                  <div className="col-filter col-auto">
                    <div className="form-group me-2">
                      <label className="text-white">Ano</label>
                      <input type="text" name="year" placeholder="Ano" value={formData.year} onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                  <div className="col-filter col-auto">
                    <div className="form-group me-2">
                      <label className="text-white">Regiões</label>
                      <select name="region" className="form-control" value={formData.region} onChange={handleSelectChange}
                      >
                        <option value="">Selecione</option>
                        {regions.map((region: Regions) => (
                          <option value={region.iso_3166_1}>{region.native_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-filter col-auto">
                    <div className="form-group me-2">
                      <label className="text-white">Incluir filmes adultos</label>
                      <select name="include_adult" className="form-control" value={formData.include_adult} onChange={handleSelectChange}
                      >
                        <option value="">Selecione</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-filter col-auto">
                    <div className="form-group">
                      <button className="submit-filter mt-4" type="submit">
                        Filtrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default SearchBar;