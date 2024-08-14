import React from 'react'

const ResultCard = () => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    Shoes!
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
                <div>
                    <progress className="progress progress-accent w-56" value="100" max="100"></progress>
                    <progress className="progress progress-accent w-56" value="70" max="100"></progress>
                    <progress className="progress progress-accent w-56" value="40" max="100"></progress>
                    <progress className="progress progress-accent w-56" value="10" max="100"></progress>
                    <progress className="progress progress-accent w-56" value={0} max="100"></progress>
                </div>
            </div>
        </div>
    )
}

export default ResultCard