import axios from "axios";
import { textData } from "../pages";

const url = process.env.SLS_URL

export const getTexts = async () => {
  const query = `
  query getText {
    getText {
      id
      at
      name
      text
    }
      }
  `
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      query: query,
    }),
    url,
  };
  return await axios(options)
    .then((response) => {
      return response.data.data.getText.sort((a: textData, b: textData) => Number(b.at) - Number(a.at))
    })
    .catch((error) => {
      console.error('Error:', error)
    });
}

export const loading = async (setList: React.Dispatch<React.SetStateAction<textData[]>>) => {
  getTexts().then(res => setList(res))
}

export const mutation = async (query: string, variable: any, setList: React.Dispatch<React.SetStateAction<textData[]>>) => {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      query: query,
      variables: variable,
    }),
    url,
  };
  return await axios(options)
    .then((res => loading(setList)))
    .catch((error) => {
      console.error('Error:', error)
    })
}

export const timestampToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp)

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const pad = (num: number): string => num.toString().padStart(2, '0');

  return `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}