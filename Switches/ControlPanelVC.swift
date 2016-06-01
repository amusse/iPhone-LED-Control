//
//  ControlPanelVC.swift
//  Switches
//
//  Created by Ahmed Musse on 5/30/16.
//  Copyright © 2016 iOTee. All rights reserved.
//

import UIKit
import SocketIOClientSwift

class ControlPanelVC: UITableViewController {

    let socket = SocketIOClient(socketURL: NSURL(string: "http://10.0.0.21:8080")!, options: [.Log(true), .ForcePolling(true)])
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        socket.connect()
        
        socket.on("connect") {data, ack in
            print("socket connected")
        }
        
        
//        socket.on("currentAmount") {data, ack in
//            if let cur = data[0] as? Double {
//                self.socket.emitWithAck("canUpdate", cur)(timeoutAfter: 0) {data in
//                    self.socket.emit("update", ["amount": cur + 2.50])
//                }
//                
//                ack.with("Got your currentAmount", "dude")
//            }
//        }
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        tableView.cellForRowAtIndexPath(indexPath)?.selected = false
    }

    @IBAction func swAction(sender: UISwitch) {
        if (sender.on) {
            // Turn LED on
            socket.emit("sig", "true")
            print("Turn LED on")
        }
        else {
            // Turn LED off
            socket.emit("sig", "false")
            print("Turn LED off")
        }
    }
}

