import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
//hook for searching the data that return the searched data
export const useSearch = (query) => {
  //set the url
  const { search, url } = query;
  const dispatch = useDispatch();
  const [searchedData, setSearchedData] = useState([]);
  const controller = new AbortController();
  const getData = useCallback(
    () => async () => {
      try {
        const { data } = await axios.get(url, {
          signal: controller?.signal,
        });
        setSearchedData(data?.results);
      } catch (error) {}
    },
    [url]
  );
  useEffect(() => {
    url && dispatch(getData());
    return () => controller.abort();
  }, [search, getData]);
  return [searchedData];
};
