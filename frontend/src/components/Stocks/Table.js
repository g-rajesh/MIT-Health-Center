import React from 'react'

const Table = ({data, page}) => {

    const startPage = (page-1) * 5 + 1;
    const endPage = page*5;



    const filteredData = data.filter((row, index) => {
        return startPage <= index+1 && index+1 <= endPage;
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Manufactured Date</th>
                    <th>Arrived Date</th>
                    <th>Expiry Date</th>
                </tr>
            </thead>

            <tbody>
                {
                    filteredData.length !== 0 && (
                        filteredData.map(row => {
                            return (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.qty}</td>
                                    <td>{row.price}</td>
                                    <td>{row.mng}</td>
                                    <td>{row.arrival}</td>
                                    <td>{row.expiry}</td>
                                </tr>
                            )
                        })
                    )
                }
            </tbody>
        </table>
    )
}

export default Table