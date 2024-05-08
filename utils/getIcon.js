import pathFormat from "./pathFormat"
class IconGenerator {
    constructor() {
        // Icons
        this.ICONS_PATH = "/icons/"

        this.iconTypeDirs = {
            "badges" : "badges/",
            "currency" : "currency/",
            "brand" : "brand/"
        }
        this.map = {
            "mainCurrency" : {
                "type": "currency",
                "filename": "ruby-014.png",
                "alt" : "Rubies",
                "className" : "rounded",
            },
            "mainBrand" : {
                "type": "brand",
                "filename": "brand-cyborg_audrey-3.png",
                "alt" : "Brand Logo",
                "style" : {
                    "opacity": "0.96",
                    "borderRadius": "28%",
                },
                "className": "rounded",
            }
        }
    }

    updatePath(iconObj) {
        let typeDir = this.iconTypeDirs[iconObj.type]
        let path = this.ICONS_PATH + typeDir + iconObj.filename
        iconObj["path"] = path
        return iconObj
    }

    createIcon(type, iconHeight="35px") {
        let iconObj = this.map[type]
        iconObj = this.updatePath(iconObj)
        let node = (
            <img className={iconObj.className} src={pathFormat(iconObj.path)} alt={iconObj.alt} height={iconHeight} style={iconObj.style} />
        )
        return node
    }
}

export default IconGenerator