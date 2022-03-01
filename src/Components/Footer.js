import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <div className="h-37vh w-full mx-7vw px-4vw bg-backgroundColor flex flex-col  ">
            <div className="mb-3">
                <FontAwesomeIcon icon={faFacebookF} size='xl' className=" text-white px-3 mr-2 cursor-pointer hover:opacity-70 " />
                <FontAwesomeIcon icon={faInstagram} size='xl' className=" text-white px-3 mr-2 cursor-pointer hover:opacity-70" />
                <FontAwesomeIcon icon={faTwitter} size='xl' className=" text-white px-3 mr-2 cursor-pointer hover:opacity-70" />
                <FontAwesomeIcon icon={faYoutube} size='xl' className=" text-white px-3 mr-2 cursor-pointer hover:opacity-70" />
            </div>
            <div className="flex flex-row text-gray-400 text-sm mb-4">
                <ul className="w-1/4">
                    <li className="mb-4 cursor-pointer hover:opacity-50">Âm thanh và phụ đề</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Trung tâm đa phương tiện</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Quyền riêng tư</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Liên hệ với chúng tôi</li>
                </ul>
                <ul className="w-1/4">
                    <li className="mb-4 cursor-pointer hover:opacity-50">Mô tả âm thanh</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Quan hệ với nhà đầu tư</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Thông báo pháp lý</li>
                </ul>
                <ul className="w-1/4">
                    <li className="mb-4 cursor-pointer hover:opacity-50">Trung tâm trợ giúp</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Việc làm</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Tùy chọn cookie</li>
                </ul>
                <ul className="w-1/4">
                    <li className="mb-4 cursor-pointer hover:opacity-50">Thẻ quà tặng</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Điều khoản sử dụng</li>
                    <li className="mb-4 cursor-pointer hover:opacity-50">Thông tin doanh nghiệp</li>
                </ul>
            </div>
            <div className="mb-4 ">
                <button className="bg-transparent  text-gray-400 font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-white">
                    Mã dịch vụ
                </button>
            </div>
            <div className="text-gray-400 text-xs">
                © 1997-2022 Netflix, Inc.cc6000d8-91d2-4a80-8fde-6c015d64a376
            </div>
        </div>
    )
}
export default Footer