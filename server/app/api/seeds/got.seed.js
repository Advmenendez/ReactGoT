const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const Got = require('../models/Got.model');


const gots = [
    {
        "name": "House Stark", 
        "leader": "Eddard Stark", 
        "motto": "Winter is coming",
        "location": "Winterfell",
        "img":"http://pm1.narvii.com/6607/99fd95b8351657b3a6b2b530c33a5153560dda24_00.jpg"
    },
    {
        "name": "House Lannister", 
        "leader": "Tywin Lannister", 
        "motto": "Hear me roar",
        "location": "Casterly Rock",
        "img":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBUQDxIWFRAXFhUVDxUVFRcWFhUVFRgWGRgVFhYZHSggGBomGxUXITEhJSkrLi4uFyAzODMtNyktLisBCgoKDg0OGhAQGy4mICYvLTIyKy8tLy0tLTAtLS8tLSsvLS0uLS8rLy8wLSstLTAuLS0tKystLS0tLS0tLS0vL//AABEIAPsAyQMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQIDBgQFBwj/xABEEAACAQIDBQQHBgUCAwkAAAABAgMAEQQSIQUGMUFREyJhcQcyQoGRodEUI1JicpIzgqKxwSRDU2PwFRZUc3SDsuHx/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAUBAwQCBv/EADYRAAEDAgMGBQUAAQMFAQAAAAEAAhEDIQQxURJBYXGR8AUTgaGxIlLB0eHxFTJCIyQ0YrIU/9oADAMBAAIRAxEAPwDn9vD5t9aLeB/q+tFLSvadqvdeRS+xvQIsOh/c31oyjof3N9aeBS0bTtUeRS+xvQJuQdD+5vrRkHT+pvrTrU8CjaOqjyKX2N6BRZB0Pxb60ZB0Pxb61Nai1G0dVHk0vsHQKHIOh+LfWjIOh+LfWp7UWo2jqjyaX2DoFBkHQ/FvrS5B0P7m+tS2pLUbR1R5NL7G9Aosg6f1N9aTKOh/c31qQiktRtO1U+RS+xvQKPKOh+LfWiw6H4t9afakIo2naqfIpfY3oEy3gf6vrRbwPxb60tFG0dUeRS+xvQJnx/c31o+Pxb60tFG0dVHkUvsb0Cb8f3N9aCfP4t9aWkNG0dUeRS+xvQJL+fxb60l/P+r60Gkqdo6o8il9g6BJmP8A0W+tFz/0W+tBpKNt2qP/AM9L7B0CyqUClApQK5VyAKeBQBTgKFykApwFAFOAqVCbaly1JaltQhRZaMtS2oy0IUWWktU1qztj7KOKfLnEaXAzEFixJItGg1kOhvwA51y97WDacYCrqVWU27TzC1LkDUkDzrYbK2FiMX/AjzLzd+5H7nI73uBqxbU3dn2dLA+EZ3QswxMoiSSRFOWwycCuhtwseetXDYSYgD78NrrmabOfA5Ldy41KhiBwFLMT4gW0RUo7JB1NxB+23PM8Qlj/ABNxcWsbHHP+fK54u6M3aGN5IlAKq7gPJaVhcRKuUF2tqdRYEVp9sbOfCzvh5CC62OmgZW4OBy+ortQwyAghQLFmFh7TXzN5m518a0O38Hhu8cahdJXVYmRGYw2Wy95e8pJL6jTUCseH8Wq7f1/UIyAE57vSTBMaQbrmnjqrHS8yNO/8LkxFNrbbw7Ojw8oSN5GWxa8sTREC9gBmtn+AtWrIp7TqNqMD25H09k4pVRVbtN776JtNp1FdqxMpKdSUKE002n000ITTRS0lqELMFPApoFSAUIKUClAoAqQCpXKAKcFpVWpIULKzKLxjIHcahS+bKp88p+VHHvRcPe1kbRzTAtLlp4//AGlC0KVHloy1Nloy0IlMlwtkSS57yy5Ry7jhD79L/wAwq07jbVwuGWY4h0jcsGVmGpjCAFQbXNipNvGtRgcbGIzDiIjJFmLoUbLJE5FiULaEHmpqaCPCu2TDYWfEy2JVJpI1SwtckR8R51ixLfMY6nUDonMFoETIkkgDQg2nVK8QXCm5rwZBJBzG+J4XiBuiFZZ9/oA1o4ZGXm3cX4Kxv8bVuNj7YXE6qQUZTJCQCCVByurA8HVrA+Yqr4PCyTFoMZs4JGVPZPh8PkaNxawDBz46kjhrxqy7q7GOFgCyWMpLsTb1c5HdHuVb25ikeKp4ZjPpEOt/yDpEEzItawNhE8ZWN2zk2Z5gjLUAflbetXt6d0QWjR4mOXEdoSAinQMVCnMt+PTjwvbLXaMRQSBxkL9mCbi75+zy/v0rRbaeVWxDIWcExwmLipWaMKrAeyQ7XJ6XvytjpU5dB7vHpn3Kqc6y0m/Oynjwkbu5dlmPG9o4pEZQik3YrmCasSbnyAoZrqO+EjwxHtYzPgnRY51BCvEw9WVGtwJtx4EKetcxcd426nLwvble2l/KvQ+EucaF8psfm24zc8wZKb+Gv+lzIOefoO+uiiOlZOM2bNFEkrLZX7wzBgwj/wCI4A7i8hmIvW33e2YCY5pVzZ3y4OE/78oOsj9IE4k8z7gcrfPFNk7MyXZ2zSE2HaomZMzD2YrghEHTMSedjsYTiG0qYm9z8j0vJ1EakFbFuNQU6Oufz6cels6kaDS0lb0zTaQ040hoUJlFKaShCzwKcopBT1FSuU4CpEsCCRcAgstyuYfhzDVfOmqKy8Dg3nkEMZUM1/WNlUDizHoNPiKC4NBLsu+7QeKqrECm7aMCO/dXvAbo4ds/3LxjuGIzMWZJBckDvEOgIXjcHvcqyNs4NcXhHk1im7scygjLnjcACQc1BuwOhymsnY+z0kjuWYzRuVGIjlZs7ZRdwT3T6xUqQQCCK2WH2arWkMhcsLOwCBZYiNFdQMrDxsD7tK8qa7g8Oc4kiM+yIMA62mJlecBcbnNUTb+7j4OEd1XHa3aYaNlZAgQoeAzAcCfdeq8Frpu3N3pZ4uxixBEYIYJKMw04L2nrWB11vVKx+7+Kw/8AEhYr+KP7xfiuo94FOsDi2vZD3jak8M+B38G20TLB12hpDzeSb8eOWfrwWoy0ZaluOo04+FWPZG5086CR2EKn1QykyEdStxl9+tbatVlITUMd6C62VK7KYlx/MqsJC7HKiljqbLqbKCSbc7AcqfgcZJBIHgcrJYqCoDEg2uuUg34Dlyq5QbqYrBzJPAyS5DcobxsykFWAJJF7E8xrarA20YI++8MqOSAf9O5OZiABnVSp1NtGrBW8QZYMbtg6ZzoWkHheI5rDVxwJIgFp1tz5+3NaLYexMXORNjp5svFIRKUv4yKlgP0/HpW32ls+KKJ3GckKcoM8uW50Fxnta5F63hFQYiFZFZHF0YFWB5gixFIH4hz3hxsJFhYegH+eKxOEknvvvOVWJNn9phckansIoycKsdu0lljuY5eQAzi6jmbE6Wrb7NhkGaSYASyEFlBuEAUALfmeJPiTWfHEEUKosqgKo6ACwFBqupVLpH+ezmTmeVlAaBdQYqFZEZHF0ZSrA8CCLGuGwwF2SNT3nZI1P5ncKD8Teuq7d3kjwzywzkJeAyYdzezGzgox4A3At1vXMdjsI54GbgssF/ISJc048LbUp06r43AjQ2P8BW/BkgVHD7f3+l0LCQokgKiyRdqyflhwqtBHH5EvI/uNUPeO4mWM8Y4MLH7xCpPzY10CWNRHLnAWMy4gYmUmwXDrK7FfNs1h5noK5rtXF9vPLORbtHZ1HMKdFB8coWq/Cae1VL9wbHUj++kagrnw5k1Z0B9+ysOm0poNegTxNpKcabQoTTRSmkoQs8VItMWpBUrlSKKfkB4gNTVqRakLkibKx4He3FRoIyUkjy5SHXKxHD10I+NqsO7u+SMTHihHEt/uWW4iC2ACOSdCOugPhVBWpEFY6mAoVAfpgneLfznZYn4Kk4WEHvcV2yMgi4NweBHA1izYFHbtEYpIeLxEd62lmBBVuFtRXOt0seYcQB2wjgALThntHlsbWU+0Tbhrxq6YGcTK82BzBczBlYWSRravGD6rXPOwJBv1pNWwTqDiJta8WvuOYvpfjASis3YcWmDGilk2GXkWZ2jM6XEb9iLWNvXUsbm44gqaB9peYIJxlQgzlIgB1EYzFu8eJN9BbrpHDPJlC4ucwtbvDKkYb9Mmo9wsR8DUyY9EMcOGjLhmtm1CAaszFzq5tfhe5IuReuS140O4W+kDUEgW0i2caGkRyWXtJ5lS8CKzXGYE8F5lRpmPhceda6LER5g87SPIvqL2Eiqh6qljc+JJ8LVvDSGsoeAIj99YPtHGVZF1oto7RxDlYsNHkd+Dyj1VFs0nZjWwv7VtSBY1tYoyqqpYsQACzWuxA4mwAufCsCLZspkkkkly527giAzdmuiKzsCdBc2AGrHU3qR9m30OIny8xnGv8wGYe40VNiAB8fn4Atvi6GzmpMPiFkzFb2Vil+RK8bdQDceamnEjhz506OJUUIgAUABQOAA5Vodp41MNj4S9lXERtEzHk8Tq0d/D72QeZFVBm2YaNfYSfgld5ZqpekqUHFRqOKwjN/MzW/8Aj86rOy8J288cX45FV/0k3Y/tBrL3ixfbYqd+XaMq/pjOQfJb++tl6PYM+OB/BHI3vYqo+RavStJw+Bmbhs+pv8lN2ny8H6f/AEf7Kd6RdqPJifs4Y9jGFJUcGkPezN1sCtvM1UTWdtmbtcTM/wCKWQ+7OUHyArANX4WkKVFjBoOu9aMIwMpNjeJ69wmmiiitC0pppDSmkNChNNNpxooQs9akFRrUgqVyplp61GtSLQoU61ItQA1mHCyqiyGNhG/8NyO63kfrRIsDvVTntBAJuUKa2CbTmEC4dWKxqzN3SQWLHNqRyB5VrlNZGHjaRgkalnbRVHE//XjUuDTnuvfdxvbKVVVYxwBfkNclY8HvK2HwwRGzzFnaVpC0gRcxCjU3uQOF/HnVg2XicTNLC+IjWO8c2VRfMdYe8QfV8uOtazYuxUha7KJsWLd0fwoTYau9vWtbx4WHOtzHHiFlJK9oQmVZHYKl3OZzYEsBogC29njrekeKfRO15bRNzJsTM5ZWvac/+O8pFULZ+nXP+dnVbDEYsJJHFa7OW5+qqqSWPhfKPNhU5rUx4Xs8UjyNnkeOVS1rC4MZCKPZWwbTzJvWdjsT2SFrZjoEXhmZjZVvyuSNaWVGiWht7fk/4/W6GnOVFFjw2IkgA/hpG7G/OQv3beSA/wA1ZRrVYbDmCZCxu0qOJW4ZpQQ4AHTKXsOQQVPtWdlUJH/FkOSM/huCWf8AlUE+NgOdVVGjaAblH8J5SCeWa6BgXWHsHGPN22f2Z5Fi/wDL0ykeHGqBvztdcTiAqaxRhoweTMx+8PkMoA8jV5x+DkhB+yqTmhEIta6MtxHJYnUd43590VyVoyncPFe6fNdD8xTfwukx1V1UbogcxBP4HOVt8PYHVJO6/fL5gqG1tBwq1ejVwMW45mE2/ldL/wB6qzVs91ccIMZC50Uv2b+UndH9WWmWOpmphqjRp8XTHFMmi4Dh0BB/C1GIUhyDxDOD5hyD86hNb3fLA9hjJV9l2Eqfpkvf+oP8q0Rq6lVFWm2oN4nqrsOZpNPAe1k2ig0V2rk2kNKaQ0KE00UGihCzhUi1GKepqVyplNSKahU1IpoUKdDXQ91tjwyYOPtHLxue0khYqY+0v0tcWIGl7Ei9UTZWBkxMqxxLmJ1OuWyAjMxblpoPEiukJBgFw6s+HREDdnbs7urh8tsyDMTmHEedK/E6sBtNpMk7oJ3xaZnSN4zSjxGoCQzS579+S0+O3LImtDMixMTkV7l15lVHtgeYq0bD2JDg1tGLufXkb1m8PAeApNk4ZQTIIhHfSPMLylersbkX/DxAGvQZuFxIkUsAQAzx68yjFSfK6mlVfF1qjdhzpA5X5xM9c1iNR7wA4mO+7ypJ5Cikqhc8lW1yT5kD4mtRicTGksf21wrOT9njGYxqy21Z7WL6ixNgOXWtJt3e+WJmgiQCVGKvIwuvG65VvqcpBJOl+tV/bG8EmLiSOUDMhcs4Fg1wAthy0vf3Vrw2AqOhzhAO8G8QSCPb/wBiDum3bMNUfBix77/a3W1N4njnnhlOYozPg2AAZZO6VQ20K2cg35AjnW3XazYjDLKImLArIpj76F0OqEDvqeI1XS/E1ziSVmJZ2LMSSzHiSeJrP2DtyTByZl70bW7WP8f5l6Pb48DytsreHjYBYBtCOAMCDGkxN9/O2h+AcGS3O1vT5m/d+nzRriIhfMtwroSMro3EGx4MOnurWYjAYiWRGdkBjV+ykjJuZGKWLRkaDKGBFzox4ctjs7aMWJjEsLZlPxU81Ycj4VOTXntt9MkZETnmNf7qM5WLZBWJgsZ2l1YZZU0lTja/BlPtIeR92hBA5tv3swwYouB93NeRTyDj+Iv9m956V0nFYXM6SKcrqbXtfMh9ZD4cx0IB63xNv7KTGQNC+h4xtzSQcGH9j4E1fhMSKFYP/wCJsR3nGeuY4m+hVNJ+12R3ccQuNNTHF9ORqfGYd4pGjlXK6Gzjo3UdQRqD0NQGvVg5EJ+0hwBFwVb94j9t2bBjf92LuYnyNlf4MFbyJqlmrn6PZVlGJwMmqSR5wPcI5P7x1Vdo7Pkw7BJBcG/ZSgXjlA9tWGl7cRxFLsG9tKo/DE5H6RwN4HK6xYRwpPdRcd9uPdjzJWGaKQ0GmKYpDSGlNNoUJDTacaShCzgacDUQNSA0KCFIDUqmoAakBqVCysPiZIyTHI6ZgA2RipIGo1GtW7djb8sssMBgVzGknZlGygucnfcEd3TNdhfV+GtUoGs7ZO1HwsnbRAFuzdLHh3hofcQp91ZsTQbVYfpBdBjdeIvHT9SsOKwzXsLmj6s7Z/1dH3k2mBgjMDklDgRXsWWZHtYcjaz+Fr1Udmbe/wBvFkPF9/Ilx3u2cXFraXuXtwsWqvvO7WzOz2uRmYtYsbsRc6EnU0gaqqGAZTplhvJJneLRY52VLPDx5ZD89Ru/e/sLKxGJeVjJIbyMbueFzYD/ABUeaos1Gat0AZJg1gaA0ZKQtTHe3HSrBu5uw+KXtpG7PD8QdMzgcxfRV/MePLrV42XsTCQAGGJL/jtmkP8A7jXNL8T4lSonZH1EZxkOZ/QPG6x1caxphon4/Mrnm7UmLWbNhSqsbA9sWSKa9/u75TdultR8a6Zg8YJLggpIukiHipPO/NTyPP5VPPGrqUcBlIsysLgjoQar+OheB1KEm1/s5JuerYV2PFWAJQngwHhdJicSMU7aIAPXqd/S27QrKtRz3bR9u/dWAmkqOCZZEV1N1YBlPgRcU+l5UKk767PGKjedFK4nD3Eq83h1N/EW7wPgw43rnbGuz7VAR45+QYRSj8UUpCi/k5U+Azda5HtrZ7YWeSFvZJyeMbXMZHu08wa9F4TXlppHdcfkehg8jwTHw+rc0zzH5/fVZ+5GIMePh/PnjPk6k/3VKxd6IYkxcoiVl+8k7RWA7pJzFkYHUNcGxAtfiam3OhL46DKPVcyN4Kitc/Ege+pt/MX2mMkARQyGNc4Ju65FOV0tYkEmz3GmljWmf+/EfZfqYnruvpaV2/8A8wROQmP7uiOOl1XabTqbW9M0lJSmkNChNNFBpKELKFSA1GDSg0IIUwNKDUYNOBoUKUGng1ADTgalQpw1Gaor069ChSZqzNkYYYjERQn1XcK36QCzf0qR761+as/YGMWHFwyubIr3c9FYFSfdmv7q4ql2w7Yzgxzi3uqq8ik4jQrq7YYPKFI+6jVcieyWN9SOeUAWHDW/IWzSaaAL362ovXiS6QEgAhKTWPjIUkRlk9UjU8CLahgeRBAIPIisTbe2YcHH2kxOpsirq7noo/zwFVI75S4x1wseHCJMwjzGQlxG/rtYLa4XMePKtFHDVqg22iw32ERcnjHAFdhjnNJAkDPRW3d5CuFhDEk5FJJ0JvrrbzrPJqLDyqw7vqgsn7CVPzBqSsr3FziTvJPVcgWWo3ulKYHEMDlYRsUI4hvZI8c1qriY/Z+1Y0XGOIsWotfOsbE8zGx0kU8cpvbpWb6S8Vkwaxc5ZFB/Sg7Q/NFHvrmJJNOvD8GKtDbkh20YI5AHrcegW3DYXzWl0wQc/fhra66IuM2ZspGOHcTYki1g6vIegYrpEnPl7657iZ2kdnc3d2Z3P5mNzbw6VHw4GimuGwgokuJLnHMnNMKGFFIlxMk7+5z33TaKKSta0pKQ0pppoQkNFFJQhZNOBqNGuAadQgGRITwacDTAaL0IIUoNOBqG9OBoUKS9LmqO9LepUJ+ajNTL06NSxCqCxYgKoFyxPAAUIJi5XR/R5tZpoWw7m5hy9mTxMTXyg+IKkeVqtc0gVSx4AEn3C9aDc3YJwURMms8ljLbgoHqxg87XOvMk1ucXiAg9UuxHdRRct/gDxOleNxbqb8Q40haf8+k5cOELz1TY2yW5SudekISHFZmDmERJkYKxjCm5bvAWBvx8hWJuKoO0Ib8u1K+fZsP7E1t94N4Ehwf2CNxJKVMczKcyRKSbxhvbYDujnpc1Ttn41oJo501aNwyjqNQy+9SV99PsO2pUwbqcR9JAOUiLOg5TrvzW+gKlTDObHLjvI/Gk2XW92WJhYH1hiMUG8+2kP9iD7621V/YWJjlkbEYRg8MxBxMd7SRThQua3K6hAR+UEXua39eZrAh5nPTQ7xCWDJUr0nwMYopB6is6v4ZwMpPhcW8yK5xXdsVAkqNHIoZGBVlPAg8q5ptrcbEROThh20XsjMBKB0a5Afz+VO/C8dTbT8moYiYJyM39DOvABMsFiW0wWP6qqU2tjtfY0+F7P7QApkDlFBuVyFQQxGl++OFa6njHte3aaZGvsmVOo2o3aabJKSlpDXS7SGm0tJQhIaKKx/tkf4lqQCcly57W/wC4gc1ffSbu99ix7MgtBPmni6B7/fJ+4hh4P4VUq9Fb/btjaWCaFbCdT2mGY8pFBsCejAlT4NXnVlIJVgVIJV1PFWU2ZT4ggir69OHbWqV+EYrzKXlHNvxu6ZcoRTr02krOm6kvRemUt6EJ16drVg3a2ThpoZJJWDS5skEKyGOxLBBI+Ug2zMPIC/MVb8Juns5V+zMgkm7PM8huZbXtmDj1LngARwPGxpdX8TpUXFsEkcOuenKDuJS+p4gxri0AmDHffquXFrcePQak+Qrpu4uwY4oxiGZZJ2BF1IZYxzRT16n3cK3+zNkwYVcuHjVBzIHeb9THVveazr0ox3ihrMNNogb75jQ2t1usWIxTq1shp+/1HVRyyqgu7BRcAEkDUmwGvMmtdtjaohDiMB5UVZZYtc7QEkMU/EwCtYeFtL3rlm39rz4uYnEHKY2ZURScsbRkqSPz3HrVFtjbEmM7IzhC8YKhslmYH8Xetx10HM9aup+DP+klwvnw03id+XAiUDBVXBpG/wBuf8lM2ocP2z/ZSTh9Gh7pXKrcUs34Tf3EViXpgFtBwpa9A0bLQJmNc/VOqTCxgaTMKSCd42zozK/4kYqf3Ct5g988dF/urIOksYb5rkNV+iuKtCnV/wB7QfT85rl9Cm+7mj89Rf3XVt1d61xxMbp2c4GawOZWUGxKmwOlxcHrzrY7dw7yRjsSVmDp2bL7N3XNfquW9wa5huexGPw9uOdwfEGKW/191dgrzHiFFmGxA8vKJjPeRF91sjuskmKoim8sBsudek5JDNGxQ9ksZVH9nO7HMh6G0a8eN6pVdV3uxiJ3GniQFTmhxUZaCUE8mAvnFuAJ48OBrlTtdmYgKSxICghAL6ZAdQLcjr11px4TULqIZFm773k8vgrbgK5M04ykz+PnS1osm000pptNEyRSUUUIWz3b2K+0MVFhY7jtDZ2HsRLrJJ8NB4kV37/uBsv/AMJH8Kr3od3YOGw5xsy2nnC9mCNUgFio8Cx7x/l6V0imNFmw1eO8RxIxFaR/tFh+/X4hFcZ9MW6nYyf9pQr925VcYBwR9FWbwB0U+NjzNdmqDF4ZJo2ilUPG6lZFYXDKwsQR0sa6c0OEFZ6FZ1GoKjcx3Hr3deVKKsG+u6smy8R2Wpga7YWQ63TnGx/4i/MWPW1fpc5paYK9pQrsrUxUZkfbh6J1FNorlXLLweMMbRdoO0iR86xCwVgxVnB/FcqvHpVp3OxwneaGdjHGe0xDCNzEMt4wEDA3VYxfQEDX3VS6Ui/jWXEYRlZpGR3HS8zFrzMrDWwFN8ltj/bzrM9IGWd32rvp9zCuHfPMGWSSRlISy3yqQLZmIIvbTjT03sGJWZpmaBoou0w6o/deRdCb8XOYoAh07x0PGqNmppsbXHDUeFUnwyhswBB135zyiLZZe/DvDmbEAmdf51j3JUksjMzM5u5Znc9WclmNh4k02m0UwgCwTAAAQMk6im0A6ihSkeRRxKr5m1BYcLi/nV/2Fi4YcJHGiCF5URu2cpmYNm7WU8fVEbEA6er41vUXBx4dY8PAjqW7GOMrbM9iTnzC4sAWJIOg50oqeK7BI2DnGf8AIF907jMQlP8Aql7Ntzv8d8VVPRxs0yTnEkfdRqRGbaNI9gbHnZb/AL66O7gAkmwAJJ6AcTWOkjRxZpMt1UsRGLLYXIVL8dNOV/Co8aseJgMTtZZ0KAXsxDry8bGkeLxBxFU1DYZWvAHcrFVqOqOLjmuZ7U3xxOJR43EPYsTlUwlmCk931nIzWtraq4osLDlT5VZSQ3EXU24XUkG3wqOvX0qFOkCKbQAU7oUabGzT3gXvffr8IpKKSrFeirf6ON0/+08VeRf9JEVbE3GkjcVh8b8W/L+oVoNibJmxs6YaAfeudL+qij1pX6KB8TYcTXpLdnYcOz8MmFgHdUd5j6zufWdvEn6cq00KcnaKTeLY3Yb5LMznwH7PwtsBbhS0UVsXmkUUUUIWm3m3fh2jh2w047p1Rh60bj1XQ8iPnqDoa87be2LPgMQ2HxAs41Uj1ZE5Sx+fMcjpXqKq7vlutBtODs5O7It2glA70bf5U8CvPzAIrq0w8cVtwONdhn6tOY/I3SPfLl5uorN2zsqbBzNh8QmWReP4XXk6Hmh+XA6isGl5BBgr11Oo2o0PYZBS0UlFQu06im0UIS0UlFCEtANJekvQpU8UpDxvIS3ZmLLoMwijYMsa+HH4mtu233lxQkmcrh2n7SVNFARsqEORqfu1F/5utaG9JVNTD035jcQOE6bp4rI/B0nbotA4Xmeatu0N6lEM2FwqFYnkZY20CJCQAREo1FzmIva2bThatau8DskizHPK0UcWGcL34zFIWzF+RAa99CcorR0VU3A0GtjZ3zO+bb/T51Kr/wBPpbGz7/jklPyptFJWtboRU+Fw8krrHEheV2CxovF2PIf3J4AAk0yGJ5HVEUvI5Coii7Ox4ACu9ejncRdmp289nxrrZyNViU/7cf8AludulXUqW2ZOSXY/Htw7YF3HIacT3fldZno83OTZcHes2LkAOJkHXlGh/AvzNzVvooreBFl5Nzi4lzjJKKKKKFCKKKKEIooooQq9vbutBtOHs5u64uYZVHfjbqOo6rwNef8AeLYGI2fOYMStjxidb9nIv4oz16rxHwJ9Q1q9vbEw+PhMGKjDxnhyZW5MjcVYdRVdSmHhbMHjX4Z1rtOY/I0K8u3pb1aN9dycRstsxvJhSbLMBw6LKB6jfm9U+B0qqmsDmFpgr1lDEU67Numf2OffKydei9NorlXJb0XpKKEJaSkooQlopKShCWkpaShEpayNn4GXESrDAheVzaNB6zDmSeSjmToKz92t28TtKbssMl7EdtI2kcIP4z7R6KNT4DWu97nbn4bZcdohmmYDt5mHfkPT8qDko08zrV9KiXXOSU47xJtGWU7u9hz48Oui13o+3Dj2YgllyyY1hZ3A7sYPGOK/AdW4nwFgLvRRW0CLBeZc5z3FzjJO9FFFFSuUUUUUIRRRRQhFFFFCEUUUUIUUsSupVwGUizAi4IPEEHiK5Hvr6KcuafZYuNS+GJ9X/wBO54foPuI0FdhorlzQ4QVbRrPou2mGCvJUiFWKsCGU2dWBVlPRlOoNMr0hvduTg9pi8q5JwLJOlhIOgPJ114H5VxTezcjG7Nu0q9pBynjBygf8xeMXzHjWSpQIuLr0WE8Vp1fpqfS72P65Hqq1ekoorOm6KKKKESiiittu9u3i9oPlwkWaxs7nuxJ+uS2p8Bc+FSGlxgKqrVZSbtPMDvryF1qCwAuTZa6BuT6M8RjcsuLzYfC6ELa00n6Qf4S+J16Acav25no2w2AKzTf6jFjUOy2SM/8AKTkfzG58uFXytlOgBdy89i/Fn1PppWGu8/r5WDsnZsGEiWDDRrHEvqqo+JPMk9TqazqKK0JOiiiihCKKKKEIooooQiiiihCKKKKEIooooQiiiihCKawBFjqOdOooQud70+ivCYrNJhP9LOdTkF4WP5ovZ81t765NvFujjtnk/aYCIxwmj78RHUsNU/nAr07TSoIsRcVW+k1y24bH1qFmmRocvTReSQD0rYbF2Jica+TCRPKb2YoLIv65DZV8r38K7ftLcXZcmNjLYRO9mZ1GZUYjgWRSFPvFXPDYaOJBHEiogFlVQFUDwA0FUtww3lbanjbnN/6bYPG/TL36Ll+7HohjS0m0X7VuPYxkrEOGjNo0nyHga6dg8LHCixwoqRqLIiKFVR0AGgrIorS1oaICU1Kr6rtp5k99PhFFFFSq0UUUUIRRRRQhFFFFCEUUUUIX/9k="
    }, 
    {
        "name": "House Baratheon", 
        "leader": "Robert Baratheon", 
        "motto": "Ours is the fury",
        "location": "Storm`s End",
        "img":"https://upload.wikimedia.org/wikipedia/commons/c/ca/A_Song_of_Ice_and_Fire_arms_of_House_Baratheon_yellow_scroll_English.png"
    }, 
    {
        "name": "House Arryn", 
        "leader": "Robert Arryn", 
        "motto": "As High as Honor",
        "location": "The Eyrie",
        "img":"https://i2.wp.com/xn--lacompaialibredebraavos-yhc.com/wp-content/uploads/2017/05/111.jpg?resize=586%2C800&ssl=1"
    }, 
    {
        "name": "House Targaryen", 
        "leader": "Daenerys Targaryen", 
        "motto": "Fire and Blood",
        "location": "king`s Landing",
        "img":"https://pm1.narvii.com/6676/132d46159b13fdb9fd00fd550424f0a0bc6cb271_hq.jpg"
    }, 
    {
        "name": "House Tyrell", 
        "leader": "Mace Tyrell", 
        "motto": "Growing Strong",
        "location": "Highgarden",
        "img":"http://3.bp.blogspot.com/-7IVUlHFtcfs/UaDD621bsKI/AAAAAAAAAKc/sGpnvI3wMwM/s1600/blas%C3%B3n-tyrell.jpg"
    }, 
    {
        "name": "House Greyjoy", 
        "leader": "Euron Greyjoy", 
        "motto": "We do not sow",
        "location": "Pyke",
        "img":"https://sites.google.com/site/daw30911732/_/rsrc/1469395681319/casa-greyjoy/Casa%20Greyjoy.png"
    },  
     
      
];


mongoose
  .connect('mongodb+srv://got:got1234@cluster0.sgygw.mongodb.net/mygotDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
	
    const allGots = await Got.find();
		
		
    if (allGots.length) {
      await Got.collection.drop(); 
      console.log('Drop database')
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
	
		await Got.insertMany(gots);
        console.log('DatabaseCreated')
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	
  .finally(() => mongoose.disconnect());